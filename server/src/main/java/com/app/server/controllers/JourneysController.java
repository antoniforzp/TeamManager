package com.app.server.controllers;

import com.app.server.core.AppCore;
import com.app.server.database.journeys.JourneysRepository;
import com.app.server.database.journeysPresence.JourneysPresenceRepository;
import com.app.server.database.meetings.MeetingsRepository;
import com.app.server.database.meetingsPresence.MeetingsPresenceRepository;
import com.app.server.model.Journey;
import com.app.server.model.JourneyPresence;
import com.app.server.model.Meeting;
import com.app.server.model.MeetingPresence;
import com.app.server.rest.Response;
import com.app.server.rest.bodies.AddJourneyBody;
import com.app.server.rest.bodies.AddMeetingBody;
import com.app.server.rest.bodies.EditJourneyBody;
import com.app.server.rest.bodies.EditMeetingBody;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class JourneysController {

    private final JourneysRepository journeysRepository;
    private final JourneysPresenceRepository journeysPresenceRepository;
    private final AppCore appCore;

    public JourneysController(JourneysRepository journeysRepository,
                              JourneysPresenceRepository journeysPresenceRepository,
                              AppCore appCore) {
        this.journeysRepository = journeysRepository;
        this.journeysPresenceRepository = journeysPresenceRepository;
        this.appCore = appCore;
    }

    @CrossOrigin
    @PostMapping(value = "/journeys{journeyId}/scouts{scoutId}")
    public ResponseEntity<Response<Boolean>> addJourneyPresence(@PathVariable int journeyId, @PathVariable int scoutId) {
        appCore.checkCoreInit();
        return new ResponseEntity<>(new Response<>(
                journeysPresenceRepository.add(journeyId, scoutId),
                appCore.getCurrentUser().getUserId()),
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @PostMapping(value = "/journeys")
    public ResponseEntity<Response<Boolean>> addJourney(@RequestBody AddJourneyBody body) {
        appCore.checkCoreInit();
        return new ResponseEntity<>(new Response<>(
                journeysRepository.add(body.getTitle(),
                        body.getPlace(),
                        body.getDate(),
                        body.getEndDate(),
                        appCore.getCurrentTeam().getTeamId()),
                appCore.getCurrentUser().getUserId()),
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @GetMapping(value = "/journeys")
    public ResponseEntity<Response<List<Journey>>> getMeetings() {
        appCore.checkCoreInit();
        return new ResponseEntity<>(new Response<>(
                journeysRepository.getAllByTeamId(appCore.getCurrentTeam().getTeamId()),
                appCore.getCurrentUser().getUserId()),
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @GetMapping(value = "/journeys{journeyId}/presence")
    public ResponseEntity<Response<List<JourneyPresence>>> getMeetingsPresence(@PathVariable int journeyId) {
        appCore.checkCoreInit();
        return new ResponseEntity<>(new Response<>(
                journeysPresenceRepository.getPresenceById(journeyId),
                appCore.getCurrentUser().getUserId()),
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @GetMapping(value = "/journeys/presence")
    public ResponseEntity<Response<List<JourneyPresence>>> getMeetingsPresenceTeam() {
        appCore.checkCoreInit();
        return new ResponseEntity<>(new Response<>(
                journeysPresenceRepository.getPresenceByTeam(appCore.getCurrentTeam().getTeamId()),
                appCore.getCurrentUser().getUserId()),
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @PatchMapping(value = "/journeys{journeyId}")
    public ResponseEntity<Response<Boolean>> editMeeting(@PathVariable int journeyId, @RequestBody EditJourneyBody body) {
        appCore.checkCoreInit();
        return new ResponseEntity<>(new Response<>(
                journeysRepository.update(journeyId,
                        body.getTitle(),
                        body.getPlace(),
                        body.getDate(),
                        body.getEndDate()
                ),
                appCore.getCurrentUser().getUserId()),
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @DeleteMapping(value = "/journeys{journeyId}")
    public ResponseEntity<Response<Boolean>> deleteMeeting(@PathVariable int journeyId) {
        appCore.checkCoreInit();
        return new ResponseEntity<>(new Response<>(
                journeysRepository.deleteById(journeyId),
                appCore.getCurrentUser().getUserId()),
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @DeleteMapping(value = "/journeys{journeyId}/scouts{scoutId}")
    public ResponseEntity<Response<Boolean>> deleteMeetingPresence(@PathVariable int journeyId, @PathVariable int scoutId) {
        appCore.checkCoreInit();
        return new ResponseEntity<>(new Response<>(
                journeysPresenceRepository.delete(journeyId, scoutId),
                appCore.getCurrentUser().getUserId()),
                HttpStatus.ACCEPTED);
    }
}
