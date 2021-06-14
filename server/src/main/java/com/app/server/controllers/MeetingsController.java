package com.app.server.controllers;

import com.app.server.api.data.EditPresenceBody;
import com.app.server.database.meetingsService.MeetingsService;
import com.app.server.database.meetingsPresenceService.MeetingsPresenceService;
import com.app.server.model.Meeting;
import com.app.server.model.MeetingPresence;
import com.app.server.api.Response;
import com.app.server.api.data.AddMeetingBody;
import com.app.server.api.data.EditMeetingBody;
import com.app.server.model.Scout;
import com.app.server.transactions.TransactionService;
import lombok.SneakyThrows;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicBoolean;

@CrossOrigin
@RestController
public class MeetingsController {

    private final MeetingsService mService;
    private final MeetingsPresenceService mpService;
    private final TransactionService transactionService;

    public MeetingsController(MeetingsService mService,
                              MeetingsPresenceService mpService,
                              TransactionService transactionService) {

        this.mService = mService;
        this.mpService = mpService;
        this.transactionService = transactionService;
    }

    // Transactional
    @SneakyThrows
    @PostMapping(value = "/api/{userId}/team/{teamId}/meetings")
    public Response<Boolean> addMeeting(@PathVariable int userId,
                                        @PathVariable int teamId,
                                        @RequestBody AddMeetingBody body) {

        Boolean data = transactionService.execute(() -> mService.add(body.getTitle(),
                body.getPlace(),
                body.getDate(),
                body.getDescription(),
                teamId));

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    // Transactional
    @SneakyThrows
    @PostMapping(value = "/api/{userId}/meetings/{meetingId}/scouts/{scoutId}")
    public Response<Boolean> addMeetingPresence(@PathVariable int userId,
                                                @PathVariable int meetingId,
                                                @PathVariable int scoutId) {

        Boolean data = transactionService.execute(() -> mpService.add(meetingId, scoutId));

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @GetMapping(value = "/api/{userId}/team/{teamId}/meetings")
    public Response<List<Meeting>> getMeetings(@PathVariable int userId,
                                               @PathVariable int teamId) {

        List<Meeting> data = mService.getAllByTeamId(teamId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @GetMapping(value = "/api/{userId}/meetings/{meetingId}/presence")
    public Response<List<MeetingPresence>> getMeetingsPresence(@PathVariable int userId,
                                                               @PathVariable int meetingId) {

        List<MeetingPresence> data = mpService.getPresenceById(meetingId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @GetMapping(value = "/api/{userId}/team/{teamId}/meetings/presence")
    public Response<List<MeetingPresence>> getMeetingsPresenceTeam(@PathVariable int userId,
                                                                   @PathVariable int teamId) {

        List<MeetingPresence> data = mpService.getPresenceByTeam(teamId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    // Transactional
    @SneakyThrows
    @PatchMapping(value = "/api/{userId}/meetings/{meetingId}/presence")
    public Response<Boolean> editMeetingPresence(@PathVariable int userId,
                                                 @PathVariable int meetingId,
                                                 @RequestBody EditPresenceBody body) {

        List<Scout> changes = body.getNewScoutsPresent();
        List<MeetingPresence> old = mpService.getPresenceById(meetingId);

        List<Integer> toAdd = new ArrayList<>();
        changes.forEach(scout -> {
            boolean check = old.stream().noneMatch(x -> x.getScoutId() == scout.getScoutId());
            if (check) {
                toAdd.add(scout.getScoutId());
            }
        });

        List<Integer> toDelete = new ArrayList<>();
        old.forEach(scout -> {
            boolean check = changes.stream().noneMatch(x -> x.getScoutId() == scout.getScoutId());
            if (check) {
                toDelete.add(scout.getScoutId());
            }
        });

        Boolean data = transactionService.execute(() -> {
            AtomicBoolean check = new AtomicBoolean(true);
            toAdd.forEach(scoutId -> {
                if (!mpService.add(meetingId, scoutId)) {
                    check.set(false);
                }
            });

            toDelete.forEach(scoutId -> {
                if (!mpService.delete(meetingId, scoutId)) {
                    check.set(false);
                }
            });
            return check.get();
        });

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    // Transactional
    @SneakyThrows
    @PatchMapping(value = "/api/{userId}/meetings/{meetingId}")
    public Response<Boolean> editMeeting(@PathVariable int userId,
                                         @PathVariable int meetingId,
                                         @RequestBody EditMeetingBody body) {

        Boolean data = transactionService.execute(() -> mService.update(meetingId,
                body.getTitle(),
                body.getPlace(),
                body.getDate(),
                body.getDescription()));

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }


    // Transactional
    @SneakyThrows
    @DeleteMapping(value = "/api/{userId}/meetings/{meetingId}")
    public Response<Boolean> deleteMeeting(@PathVariable int userId,
                                           @PathVariable int meetingId) {

        Boolean data = transactionService.execute(() -> mService.deleteById(meetingId));

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    // Transactional
    @SneakyThrows
    @DeleteMapping(value = "/api/{userId}/meetings{meetingId}/scouts{scoutId}")
    public Response<Boolean> deleteMeetingPresence(@PathVariable int userId,
                                                   @PathVariable int meetingId,
                                                   @PathVariable int scoutId) {

        Boolean data = transactionService.execute(() -> mpService.delete(meetingId, scoutId));

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }
}
