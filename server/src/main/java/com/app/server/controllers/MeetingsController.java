package com.app.server.controllers;

import com.app.server.core.AppCore;
import com.app.server.database.meetings.MeetingsRepository;
import com.app.server.model.Meeting;
import com.app.server.rest.Response;
import com.app.server.rest.bodies.AddMeetingBody;
import com.app.server.rest.bodies.EditMeetingBody;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class MeetingsController {

    private final MeetingsRepository repository;
    private final AppCore appCore;

    public MeetingsController(MeetingsRepository repository, AppCore appCore) {
        this.repository = repository;
        this.appCore = appCore;
    }

    @CrossOrigin
    @PostMapping(value = "/meetings")
    public ResponseEntity<Response<Boolean>> addMeeting(@RequestBody AddMeetingBody body) {
        appCore.checkCoreInit();
        return new ResponseEntity<>(new Response<>(
                repository.add(body.getTitle(),
                        body.getPlace(),
                        body.getDate(),
                        appCore.getCurrentTeam().getTeamId()),
                appCore.getCurrentUser().getUserId()),
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @GetMapping(value = "/meetings")
    public ResponseEntity<Response<List<Meeting>>> getMeetings() {
        appCore.checkCoreInit();
        return new ResponseEntity<>(new Response<>(
                repository.getAllByTeamId(appCore.getCurrentTeam().getTeamId()),
                appCore.getCurrentUser().getUserId()),
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @PatchMapping(value = "/meetings{meetingId}")
    public ResponseEntity<Response<Boolean>> editMeeting(@PathVariable int meetingId, @RequestBody EditMeetingBody body) {
        appCore.checkCoreInit();
        return new ResponseEntity<>(new Response<>(
                repository.update(meetingId,
                        body.getTitle(),
                        body.getPlace(),
                        body.getDate()
                ),
                appCore.getCurrentUser().getUserId()),
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @DeleteMapping(value = "/meetings{meetingId}")
    public ResponseEntity<Response<Boolean>> deleteMeeting(@PathVariable int meetingId) {
        appCore.checkCoreInit();
        return new ResponseEntity<>(new Response<>(
                repository.deleteById(meetingId),
                appCore.getCurrentUser().getUserId()),
                HttpStatus.ACCEPTED);
    }
}
