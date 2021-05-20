package com.app.server.controllers;

import com.app.server.core.AppCore;
import com.app.server.database.teams.TeamsRepository;
import com.app.server.model.Team;
import com.app.server.api.Response;
import com.app.server.api.data.AddTeamBody;
import com.app.server.api.data.EditTeamBody;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TeamsController {

    private final TeamsRepository repository;

    public TeamsController(TeamsRepository repository) {
        this.repository = repository;
    }

    @CrossOrigin
    @PostMapping(value = "/api/{userId}/teams")
    public Response<Boolean> addTeam(@PathVariable int userId,
                                     @RequestBody AddTeamBody body) {
        Boolean check = repository.add(body.getName(),
                body.getPatron(),
                userId);

        return new Response<>(
                check,
                userId,
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @GetMapping(value = "/api/{userId}/teams")
    public Response<List<Team>> getTeams(@PathVariable int userId) {
        List<Team> data = repository.getByUserId(userId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @PatchMapping(value = "/api/{userId}/teams/{teamId}")
    public Response<Boolean> editTeam(@PathVariable int userId,
                                      @PathVariable int teamId,
                                      @RequestBody EditTeamBody body) {
        Boolean data = repository.update(teamId,
                body.getName(),
                body.getPatron());

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @DeleteMapping(value = "/api/{userId}/teams/{teamId}")
    public Response<Boolean> deleteTeam(@PathVariable int userId,
                                        @PathVariable int teamId) {
        Boolean data = repository.deleteById(teamId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }
}