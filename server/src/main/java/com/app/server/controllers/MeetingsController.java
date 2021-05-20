package com.app.server.controllers;

import com.app.server.database.meetings.MeetingsRepository;
import com.app.server.database.meetingsPresence.MeetingsPresenceRepository;
import com.app.server.model.Meeting;
import com.app.server.model.MeetingPresence;
import com.app.server.api.Response;
import com.app.server.api.data.AddMeetingBody;
import com.app.server.api.data.EditMeetingBody;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class MeetingsController {

    private final MeetingsRepository mRepository;
    private final MeetingsPresenceRepository mpRepository;

    public MeetingsController(MeetingsRepository mRepository,
                              MeetingsPresenceRepository mpRepository) {
        this.mRepository = mRepository;
        this.mpRepository = mpRepository;
    }

    @CrossOrigin
    @PostMapping(value = "/api/{userId}/meetings/{meetingId}/scouts/{scoutId}")
    public Response<Boolean> addMeetingPresence(@PathVariable int userId,
                                                @PathVariable int meetingId,
                                                @PathVariable int scoutId) {
        Boolean data = mpRepository.add(meetingId, scoutId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @PostMapping(value = "/api/{userId}/team/{teamId}/meetings")
    public Response<Boolean> addMeeting(@PathVariable int userId,
                                        @PathVariable int teamId,
                                        @RequestBody AddMeetingBody body) {
        Boolean data = mRepository.add(body.getTitle(),
                body.getPlace(),
                body.getDate(),
                teamId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @GetMapping(value = "/api/{userId}/team/{teamId}/meetings")
    public Response<List<Meeting>> getMeetings(@PathVariable int userId,
                                               @PathVariable int teamId) {
        List<Meeting> data = mRepository.getAllByTeamId(teamId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @GetMapping(value = "/api/{userId}/meetings/{meetingId}/presence")
    public Response<List<MeetingPresence>> getMeetingsPresence(@PathVariable int userId,
                                                               @PathVariable int meetingId) {
        List<MeetingPresence> data = mpRepository.getPresenceById(meetingId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @GetMapping(value = "/api/{userId}/team/{teamId}/meetings/presence")
    public Response<List<MeetingPresence>> getMeetingsPresenceTeam(@PathVariable int userId,
                                                                   @PathVariable int teamId) {
        List<MeetingPresence> data = mpRepository.getPresenceByTeam(teamId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @PatchMapping(value = "/api/{userId}/meetings/{meetingId}")
    public Response<Boolean> editMeeting(@PathVariable int userId,
                                         @PathVariable int meetingId,
                                         @RequestBody EditMeetingBody body) {
        Boolean data = mRepository.update(meetingId,
                body.getTitle(),
                body.getPlace(),
                body.getDate());

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @DeleteMapping(value = "/api/{userId}/meetings/{meetingId}")
    public Response<Boolean> deleteMeeting(@PathVariable int userId,
                                           @PathVariable int meetingId) {
        Boolean data = mRepository.deleteById(meetingId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @DeleteMapping(value = "//api/{userId}/meetings{meetingId}/scouts{scoutId}")
    public Response<Boolean> deleteMeetingPresence(@PathVariable int userId,
                                                   @PathVariable int meetingId,
                                                   @PathVariable int scoutId) {
        Boolean data = mpRepository.delete(meetingId, scoutId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }
}
