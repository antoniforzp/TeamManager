package com.app.server.api.controllers;

import com.app.server.core.logic.TeamsLogic;
import com.app.server.api.rest.body.AddTeamBody;
import com.app.server.api.rest.body.EditTeamBody;
import com.app.server.api.rest.response.Response;
import com.app.server.model.data.Team;
import lombok.SneakyThrows;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
public class TeamsController {

    private final TeamsLogic logic;

    public TeamsController(TeamsLogic logic) {
        this.logic = logic;
    }

    // Transactional
    @SneakyThrows
    @PostMapping(value = "/api/{userId}/teams")
    public Response<Boolean> addTeam(@PathVariable int userId,
                                     @RequestBody AddTeamBody body) {

        Boolean data = logic.addTeam(userId, body);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @GetMapping(value = "/api/{userId}/teams/{teamId}")
    public Response<Team> getTeam(@PathVariable int userId,
                                  @PathVariable int teamId) {

        Team data = logic.getTeam(teamId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @GetMapping(value = "/api/{userId}/teams")
    public Response<List<Team>> getTeams(@PathVariable int userId) {

        List<Team> data = logic.getTeams(userId);

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

        Boolean data = logic.editTeam(teamId, body);

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

        Boolean data = logic.deleteTeam(teamId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }
}