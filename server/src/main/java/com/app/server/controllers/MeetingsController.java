package com.app.server.controllers;

import com.app.server.database.meetingsService.MeetingsService;
import com.app.server.database.meetingsPresenceService.MeetingsPresenceService;
import com.app.server.model.Meeting;
import com.app.server.model.MeetingPresence;
import com.app.server.api.Response;
import com.app.server.api.data.AddMeetingBody;
import com.app.server.api.data.EditMeetingBody;
import lombok.SneakyThrows;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@CrossOrigin
@RestController
public class MeetingsController {

    private final MeetingsService mService;
    private final MeetingsPresenceService mpService;

    public MeetingsController(MeetingsService mService,
                              MeetingsPresenceService mpService) {
        this.mService = mService;
        this.mpService = mpService;
    }

    @SneakyThrows
    @PostMapping(value = "/api/{userId}/meetings/{meetingId}/scouts/{scoutId}")
    public Response<Boolean> addMeetingPresence(@PathVariable int userId,
                                                @PathVariable int meetingId,
                                                @PathVariable int scoutId) {

        CompletableFuture<Boolean> data = mpService.add(meetingId, scoutId);
        CompletableFuture.allOf(data).join();

        return new Response<>(
                data.get(),
                userId,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @PostMapping(value = "/api/{userId}/team/{teamId}/meetings")
    public Response<Boolean> addMeeting(@PathVariable int userId,
                                        @PathVariable int teamId,
                                        @RequestBody AddMeetingBody body) {

        CompletableFuture<Boolean> data = mService.add(body.getTitle(),
                body.getPlace(),
                body.getDate(),
                teamId);
        CompletableFuture.allOf(data).join();

        return new Response<>(
                data.get(),
                userId,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @GetMapping(value = "/api/{userId}/team/{teamId}/meetings")
    public Response<List<Meeting>> getMeetings(@PathVariable int userId,
                                               @PathVariable int teamId) {

        CompletableFuture<List<Meeting>> data = mService.getAllByTeamId(teamId);
        CompletableFuture.allOf(data).join();

        return new Response<>(
                data.get(),
                userId,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @GetMapping(value = "/api/{userId}/meetings/{meetingId}/presence")
    public Response<List<MeetingPresence>> getMeetingsPresence(@PathVariable int userId,
                                                               @PathVariable int meetingId) {

        CompletableFuture<List<MeetingPresence>> data = mpService.getPresenceById(meetingId);
        CompletableFuture.allOf(data).join();

        return new Response<>(
                data.get(),
                userId,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @GetMapping(value = "/api/{userId}/team/{teamId}/meetings/presence")
    public Response<List<MeetingPresence>> getMeetingsPresenceTeam(@PathVariable int userId,
                                                                   @PathVariable int teamId) {

        CompletableFuture<List<MeetingPresence>> data = mpService.getPresenceByTeam(teamId);
        CompletableFuture.allOf(data).join();

        return new Response<>(
                data.get(),
                userId,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @PatchMapping(value = "/api/{userId}/meetings/{meetingId}")
    public Response<Boolean> editMeeting(@PathVariable int userId,
                                         @PathVariable int meetingId,
                                         @RequestBody EditMeetingBody body) {

        CompletableFuture<Boolean> data = mService.update(meetingId,
                body.getTitle(),
                body.getPlace(),
                body.getDate());
        CompletableFuture.allOf(data).join();


        return new Response<>(
                data.get(),
                userId,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @DeleteMapping(value = "/api/{userId}/meetings/{meetingId}")
    public Response<Boolean> deleteMeeting(@PathVariable int userId,
                                           @PathVariable int meetingId) {

        CompletableFuture<Boolean> data = mService.deleteById(meetingId);
        CompletableFuture.allOf(data).join();

        return new Response<>(
                data.get(),
                userId,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @DeleteMapping(value = "//api/{userId}/meetings{meetingId}/scouts{scoutId}")
    public Response<Boolean> deleteMeetingPresence(@PathVariable int userId,
                                                   @PathVariable int meetingId,
                                                   @PathVariable int scoutId) {

        CompletableFuture<Boolean> data = mpService.delete(meetingId, scoutId);
        CompletableFuture.allOf(data).join();

        return new Response<>(
                data.get(),
                userId,
                HttpStatus.ACCEPTED);
    }
}
