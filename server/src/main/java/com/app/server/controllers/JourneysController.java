package com.app.server.controllers;

import com.app.server.api.data.EditPresenceBody;
import com.app.server.database.journeysService.JourneysService;
import com.app.server.database.journeysPresenceService.JourneysPresenceService;
import com.app.server.model.Journey;
import com.app.server.model.JourneyPresence;
import com.app.server.api.Response;
import com.app.server.api.data.AddJourneyBody;
import com.app.server.api.data.EditJourneyBody;
import com.app.server.transactions.TransactionService;
import lombok.SneakyThrows;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
public class JourneysController {

    private final JourneysService jService;
    private final JourneysPresenceService jpService;
    private final TransactionService transactionService;

    public JourneysController(JourneysService jService,
                              JourneysPresenceService jpService,
                              TransactionService transactionService) {
        this.jService = jService;
        this.jpService = jpService;
        this.transactionService = transactionService;
    }

    // Transactional
    @SneakyThrows
    @PostMapping(value = "/api/{userId}/team/{teamId}/journeys")
    public Response<Boolean> addJourney(@PathVariable int userId,
                                        @PathVariable int teamId,
                                        @RequestBody AddJourneyBody body) {

        Boolean data = transactionService.execute(() -> jService.add(body.getTitle(),
                body.getPlace(),
                body.getDate(),
                body.getEndDate(),
                body.getDescription(),
                teamId));

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    // Transactional
    @SneakyThrows
    @PostMapping(value = "/api/{userId}/journeys/{journeyId}/scouts/{scoutId}")
    public Response<Boolean> addJourneyPresence(@PathVariable int userId,
                                                @PathVariable int journeyId,
                                                @PathVariable int scoutId) {

        Boolean data = transactionService.execute(() -> jpService.add(journeyId, scoutId));

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @GetMapping(value = "/api/{userId}/team/{teamId}/journeys")
    public Response<List<Journey>> getJourneys(@PathVariable int userId,
                                               @PathVariable int teamId) {

        List<Journey> data = jService.getAllByTeamId(teamId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @GetMapping(value = "/api/{userId}/journeys/{journeyId}/presence")
    public Response<List<JourneyPresence>> getJourneysPresence(@PathVariable int userId,
                                                               @PathVariable int journeyId) {

        List<JourneyPresence> data = jpService.getPresenceById(journeyId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @GetMapping(value = "/api/{userId}/team/{teamId}/journeys/presence")
    public Response<List<JourneyPresence>> getJourneysPresenceTeam(@PathVariable int userId,
                                                                   @PathVariable int teamId) {

        List<JourneyPresence> data = jpService.getPresenceByTeam(teamId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }


    // TODO: attach to client application + REST documentation
    // Transactional
    @SneakyThrows
    @PatchMapping(value = "/api/{userId}/meetings/{meetingId}/presence")
    public Response<Boolean> editJourneysPresence(@PathVariable int userId,
                                                  @PathVariable int meetingId,
                                                  @RequestBody EditPresenceBody body) {

        Boolean data = false;

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

        Boolean data = transactionService.execute(() -> jService.update(journeyId,
                body.getTitle(),
                body.getPlace(),
                body.getDate(),
                body.getEndDate(),
                body.getDescription()));

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

        Boolean data = transactionService.execute(() -> jService.deleteById(journeyId));

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

        Boolean data = transactionService.execute(() -> jpService.delete(journeyId, scoutId));

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }
}
