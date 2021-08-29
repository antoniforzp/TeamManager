package com.app.server.api.controllers;

import com.app.server.api.rest.body.EditPresenceBody;
import com.app.server.core.logic.MeetingsLogic;
import com.app.server.model.data.Meeting;
import com.app.server.model.data.MeetingPresence;
import com.app.server.api.rest.response.Response;
import com.app.server.api.rest.body.AddMeetingBody;
import com.app.server.api.rest.body.EditMeetingBody;
import lombok.SneakyThrows;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
public class MeetingsController {

    private final MeetingsLogic logic;

    public MeetingsController(MeetingsLogic logic) {
        this.logic = logic;
    }

    // Transactional
    @SneakyThrows
    @PostMapping(value = "/api/{userId}/team/{teamId}/meetings")
    public Response<Boolean> addMeeting(@PathVariable int userId,
                                        @PathVariable int teamId,
                                        @RequestBody AddMeetingBody body) {

        Boolean data = logic.addMeeting(teamId, body);

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

        Boolean data = logic.addMeetingPresence(meetingId, scoutId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @GetMapping(value = "/api/{userId}/team/{teamId}/meetings")
    public Response<List<Meeting>> getMeetings(@PathVariable int userId,
                                               @PathVariable int teamId) {

        List<Meeting> data = logic.getMeetings(teamId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @GetMapping(value = "/api/{userId}/meetings/{meetingId}/presence")
    public Response<List<MeetingPresence>> getMeetingsPresence(@PathVariable int userId,
                                                               @PathVariable int meetingId) {

        List<MeetingPresence> data = logic.getMeetingsPresence(meetingId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @GetMapping(value = "/api/{userId}/team/{teamId}/meetings/presence")
    public Response<List<MeetingPresence>> getMeetingsPresenceTeam(@PathVariable int userId,
                                                                   @PathVariable int teamId) {

        List<MeetingPresence> data = logic.getMeetingsPresenceTeam(teamId);

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

        Boolean data = logic.editMeetingPresence(meetingId, body);

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

        Boolean data = logic.editMeeting(meetingId, body);

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

        Boolean data = logic.deleteMeeting(meetingId);

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

        Boolean data = logic.deleteMeetingPresence(meetingId, scoutId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }
}
