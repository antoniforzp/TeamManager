package com.app.server.controllers;

import com.app.server.database.journeys.JourneysRepository;
import com.app.server.database.journeysPresence.JourneysPresenceRepository;
import com.app.server.model.Journey;
import com.app.server.model.JourneyPresence;
import com.app.server.api.Response;
import com.app.server.api.data.AddJourneyBody;
import com.app.server.api.data.EditJourneyBody;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class JourneysController {

    private final JourneysRepository jRepository;
    private final JourneysPresenceRepository jpRepository;

    public JourneysController(JourneysRepository jRepository,
                              JourneysPresenceRepository jpRepository) {
        this.jRepository = jRepository;
        this.jpRepository = jpRepository;
    }

    @CrossOrigin
    @PostMapping(value = "/api/{userId}/journeys/{journeyId}/scouts/{scoutId}")
    public Response<Boolean> addJourneyPresence(@PathVariable int userId,
                                                @PathVariable int journeyId,
                                                @PathVariable int scoutId) {
        Boolean data = jpRepository.add(journeyId, scoutId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @PostMapping(value = "/api/{userId}/team/{teamId}/journeys")
    public Response<Boolean> addJourney(@PathVariable int userId,
                                        @PathVariable int teamId,
                                        @RequestBody AddJourneyBody body) {
        Boolean data = jRepository.add(body.getTitle(),
                body.getPlace(),
                body.getDate(),
                body.getEndDate(),
                teamId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @GetMapping(value = "/api/{userId}/team/{teamId}/journeys")
    public Response<List<Journey>> getJourneys(@PathVariable int userId,
                                               @PathVariable int teamId) {
        List<Journey> data = jRepository.getAllByTeamId(teamId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @GetMapping(value = "/api/{userId}/journeys/{journeyId}/presence")
    public Response<List<JourneyPresence>> getJourneysPresence(@PathVariable int userId,
                                                               @PathVariable int journeyId) {
        List<JourneyPresence> data = jpRepository.getPresenceById(journeyId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @GetMapping(value = "/api/{userId}/team/{teamId}/journeys/presence")
    public Response<List<JourneyPresence>> getJourneysPresenceTeam(@PathVariable int userId,
                                                                   @PathVariable int teamId) {
        List<JourneyPresence> data = jpRepository.getPresenceByTeam(teamId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @PatchMapping(value = "/api/{userId}/journeys/{journeyId}")
    public Response<Boolean> editJourney(@PathVariable int userId,
                                         @PathVariable int journeyId,
                                         @RequestBody EditJourneyBody body) {
        Boolean data = jRepository.update(journeyId,
                body.getTitle(),
                body.getPlace(),
                body.getDate(),
                body.getEndDate()
        );

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @DeleteMapping(value = "/api/{userId}/journeys/{journeyId}")
    public Response<Boolean> deleteJourney(@PathVariable int userId,
                                           @PathVariable int journeyId) {
        Boolean data = jRepository.deleteById(journeyId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @DeleteMapping(value = "/api/{userId}/journeys/{journeyId}/scouts{scoutId}")
    public Response<Boolean> deleteJourneyPresence(@PathVariable int userId,
                                                   @PathVariable int journeyId,
                                                   @PathVariable int scoutId) {
        Boolean data = jpRepository.delete(journeyId, scoutId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }
}
