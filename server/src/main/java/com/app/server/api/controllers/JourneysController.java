package com.app.server.api.controllers;

import com.app.server.api.rest.response.Response;
import com.app.server.api.rest.body.AddJourneyBody;
import com.app.server.api.rest.body.EditJourneyBody;
import com.app.server.api.rest.body.EditPresenceBody;
import com.app.server.core.logic.JourneysLogic;
import com.app.server.model.data.Journey;
import com.app.server.model.data.JourneyPresence;
import lombok.SneakyThrows;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
public class JourneysController {

    private final JourneysLogic logic;

    public JourneysController(JourneysLogic logic) {
        this.logic = logic;
    }

    // Transactional
    @SneakyThrows
    @PostMapping(value = "/api/{userId}/team/{teamId}/journeys")
    public Response<Boolean> addJourney(@PathVariable int userId,
                                        @PathVariable int teamId,
                                        @RequestBody AddJourneyBody body) {
        return new Response<>(
                logic.addJourney(teamId, body),
                userId,
                HttpStatus.ACCEPTED);
    }

    // Transactional
    @SneakyThrows
    @PostMapping(value = "/api/{userId}/journeys/{journeyId}/scouts/{scoutId}")
    public Response<Boolean> addJourneyPresence(@PathVariable int userId,
                                                @PathVariable int journeyId,
                                                @PathVariable int scoutId) {

        Boolean data = logic.addJourneyPresence(journeyId, scoutId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @GetMapping(value = "/api/{userId}/team/{teamId}/journeys")
    public Response<List<Journey>> getJourneys(@PathVariable int userId,
                                               @PathVariable int teamId) {

        List<Journey> data = logic.getJourneys(teamId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @GetMapping(value = "/api/{userId}/journeys/{journeyId}/presence")
    public Response<List<JourneyPresence>> getJourneysPresence(@PathVariable int userId,
                                                               @PathVariable int journeyId) {

        List<JourneyPresence> data = logic.getJourneysPresence(journeyId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @GetMapping(value = "/api/{userId}/team/{teamId}/journeys/presence")
    public Response<List<JourneyPresence>> getJourneysPresenceTeam(@PathVariable int userId,
                                                                   @PathVariable int teamId) {

        List<JourneyPresence> data = logic.getJourneysPresenceTeam(teamId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    // Transactional
    @SneakyThrows
    @PatchMapping(value = "/api/{userId}/journeys/{journeyId}/presence")
    public Response<Boolean> editJourneysPresence(@PathVariable int userId,
                                                  @PathVariable int journeyId,
                                                  @RequestBody EditPresenceBody body) {

        Boolean data = logic.editJourneysPresence(journeyId, body);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    // Transactional
    @SneakyThrows
    @PatchMapping(value = "/api/{userId}/journeys/{journeyId}")
    public Response<Boolean> editJourney(@PathVariable int userId,
                                         @PathVariable int journeyId,
                                         @RequestBody EditJourneyBody body) {

        Boolean data = logic.editJourney(journeyId, body);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    // Transactional
    @SneakyThrows
    @DeleteMapping(value = "/api/{userId}/journeys/{journeyId}")
    public Response<Boolean> deleteJourney(@PathVariable int userId,
                                           @PathVariable int journeyId) {

        Boolean data = logic.deleteJourney(journeyId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    // Transactional
    @SneakyThrows
    @DeleteMapping(value = "/api/{userId}/journeys/{journeyId}/scouts/{scoutId}")
    public Response<Boolean> deleteJourneyPresence(@PathVariable int userId,
                                                   @PathVariable int journeyId,
                                                   @PathVariable int scoutId) {

        Boolean data = logic.deleteJourneyPresence(journeyId, scoutId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }
}
