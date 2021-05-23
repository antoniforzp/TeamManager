package com.app.server.controllers;

import com.app.server.database.teamsService.TeamsService;
import com.app.server.model.Team;
import com.app.server.api.Response;
import com.app.server.api.data.AddTeamBody;
import com.app.server.api.data.EditTeamBody;
import lombok.SneakyThrows;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@CrossOrigin
@RestController
public class TeamsController {

    private final TeamsService service;

    public TeamsController(TeamsService service) {
        this.service = service;
    }

    @SneakyThrows
    @PostMapping(value = "/api/{userId}/teams")
    public Response<Boolean> addTeam(@PathVariable int userId,
                                     @RequestBody AddTeamBody body) {

        CompletableFuture<Boolean> data = service.add(body.getName(),
                body.getPatron(),
                userId);
        CompletableFuture.allOf(data).join();

        return new Response<>(
                data.get(),
                userId,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @GetMapping(value = "/api/{userId}/teams")
    public Response<List<Team>> getTeams(@PathVariable int userId) {

        CompletableFuture<List<Team>> data = service.getByUserId(userId);
        CompletableFuture.allOf(data).join();

        return new Response<>(
                data.get(),
                userId,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @CrossOrigin
    @PatchMapping(value = "/api/{userId}/teams/{teamId}")
    public Response<Boolean> editTeam(@PathVariable int userId,
                                      @PathVariable int teamId,
                                      @RequestBody EditTeamBody body) {

        CompletableFuture<Boolean> data = service.update(teamId,
                body.getName(),
                body.getPatron());
        CompletableFuture.allOf(data).join();

        return new Response<>(
                data.get(),
                userId,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @CrossOrigin
    @DeleteMapping(value = "/api/{userId}/teams/{teamId}")
    public Response<Boolean> deleteTeam(@PathVariable int userId,
                                        @PathVariable int teamId) {

        CompletableFuture<Boolean> data = service.deleteById(teamId);
        CompletableFuture.allOf(data).join();

        return new Response<>(
                data.get(),
                userId,
                HttpStatus.ACCEPTED);
    }
}