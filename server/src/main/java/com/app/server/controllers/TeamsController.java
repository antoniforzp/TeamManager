package com.app.server.controllers;

import com.app.server.database.teamsService.TeamsService;
import com.app.server.model.Team;
import com.app.server.api.Response;
import com.app.server.api.data.AddTeamBody;
import com.app.server.api.data.EditTeamBody;
import com.app.server.transactions.TransactionService;
import lombok.SneakyThrows;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
public class TeamsController {

    private final TeamsService service;
    private final TransactionService transactionService;

    public TeamsController(TeamsService service,
                           TransactionService transactionService) {

        this.service = service;
        this.transactionService = transactionService;
    }

    // Transactional
    @SneakyThrows
    @PostMapping(value = "/api/{userId}/teams")
    public Response<Boolean> addTeam(@PathVariable int userId,
                                     @RequestBody AddTeamBody body) {

        Boolean data = transactionService.execute(() -> service.add(body.getName(),
                body.getPatron(),
                userId));

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @GetMapping(value = "/api/{userId}/teams/{teamId}")
    public Response<Team> getTeam(@PathVariable int userId,
                                  @PathVariable int teamId) {

        Team data = service.getById(teamId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @GetMapping(value = "/api/{userId}/teams")
    public Response<List<Team>> getTeams(@PathVariable int userId) {

        List<Team> data = service.getByUserId(userId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    // Transactional
    @SneakyThrows
    @PatchMapping(value = "/api/{userId}/teams/{teamId}")
    public Response<Boolean> editTeam(@PathVariable int userId,
                                      @PathVariable int teamId,
                                      @RequestBody EditTeamBody body) {

        Boolean data = transactionService.execute(() -> service.update(teamId,
                body.getName(),
                body.getPatron()));

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    // Transactional
    @SneakyThrows
    @DeleteMapping(value = "/api/{userId}/teams/{teamId}")
    public Response<Boolean> deleteTeam(@PathVariable int userId,
                                        @PathVariable int teamId) {

        Boolean data = transactionService.execute(() -> service.deleteById(teamId));

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }
}