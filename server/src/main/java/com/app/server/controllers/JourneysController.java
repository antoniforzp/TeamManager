package com.app.server.controllers;

import com.app.server.database.journeysService.JourneysService;
import com.app.server.database.journeysPresenceService.JourneysPresenceService;
import com.app.server.model.Journey;
import com.app.server.model.JourneyPresence;
import com.app.server.api.Response;
import com.app.server.api.data.AddJourneyBody;
import com.app.server.api.data.EditJourneyBody;
import lombok.SneakyThrows;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@CrossOrigin
@RestController
public class JourneysController {

    private final JourneysService jService;
    private final JourneysPresenceService jpService;

    public JourneysController(JourneysService jService,
                              JourneysPresenceService jpService) {
        this.jService = jService;
        this.jpService = jpService;
    }

    @SneakyThrows
    @PostMapping(value = "/api/{userId}/journeys/{journeyId}/scouts/{scoutId}")
    public Response<Boolean> addJourneyPresence(@PathVariable int userId,
                                                @PathVariable int journeyId,
                                                @PathVariable int scoutId) {

        CompletableFuture<Boolean> data = jpService.add(journeyId, scoutId);
        CompletableFuture.allOf(data).join();

        return new Response<>(
                data.get(),
                userId,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @PostMapping(value = "/api/{userId}/team/{teamId}/journeys")
    public Response<Boolean> addJourney(@PathVariable int userId,
                                        @PathVariable int teamId,
                                        @RequestBody AddJourneyBody body) {

        CompletableFuture<Boolean> data = jService.add(body.getTitle(),
                body.getPlace(),
                body.getDate(),
                body.getEndDate(),
                teamId);
        CompletableFuture.allOf(data).join();

        return new Response<>(
                data.get(),
                userId,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @GetMapping(value = "/api/{userId}/team/{teamId}/journeys")
    public Response<List<Journey>> getJourneys(@PathVariable int userId,
                                               @PathVariable int teamId) {

        CompletableFuture<List<Journey>> data = jService.getAllByTeamId(teamId);
        CompletableFuture.allOf(data).join();

        return new Response<>(
                data.get(),
                userId,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @GetMapping(value = "/api/{userId}/journeys/{journeyId}/presence")
    public Response<List<JourneyPresence>> getJourneysPresence(@PathVariable int userId,
                                                               @PathVariable int journeyId) {

        CompletableFuture<List<JourneyPresence>> data = jpService.getPresenceById(journeyId);
        CompletableFuture.allOf(data).join();

        return new Response<>(
                data.get(),
                userId,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @GetMapping(value = "/api/{userId}/team/{teamId}/journeys/presence")
    public Response<List<JourneyPresence>> getJourneysPresenceTeam(@PathVariable int userId,
                                                                   @PathVariable int teamId) {

        CompletableFuture<List<JourneyPresence>> data = jpService.getPresenceByTeam(teamId);
        CompletableFuture.allOf(data).join();

        return new Response<>(
                data.get(),
                userId,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @PatchMapping(value = "/api/{userId}/journeys/{journeyId}")
    public Response<Boolean> editJourney(@PathVariable int userId,
                                         @PathVariable int journeyId,
                                         @RequestBody EditJourneyBody body) {

        CompletableFuture<Boolean> data = jService.update(journeyId,
                body.getTitle(),
                body.getPlace(),
                body.getDate(),
                body.getEndDate()
        );
        CompletableFuture.allOf(data).join();

        return new Response<>(
                data.get(),
                userId,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @DeleteMapping(value = "/api/{userId}/journeys/{journeyId}")
    public Response<Boolean> deleteJourney(@PathVariable int userId,
                                           @PathVariable int journeyId) {

        CompletableFuture<Boolean> data = jService.deleteById(journeyId);
        CompletableFuture.allOf(data).join();

        return new Response<>(
                data.get(),
                userId,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @DeleteMapping(value = "/api/{userId}/journeys/{journeyId}/scouts/{scoutId}")
    public Response<Boolean> deleteJourneyPresence(@PathVariable int userId,
                                                   @PathVariable int journeyId,
                                                   @PathVariable int scoutId) {

        CompletableFuture<Boolean> data = jpService.delete(journeyId, scoutId);
        CompletableFuture.allOf(data).join();

        return new Response<>(
                data.get(),
                userId,
                HttpStatus.ACCEPTED);
    }
}
