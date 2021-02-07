package com.app.server.controllers;

import com.app.server.core.AppCore;
import com.app.server.database.teams.TeamsRepository;
import com.app.server.model.Team;
import com.app.server.rest.Response;
import com.app.server.rest.bodies.AddTeamBody;
import com.app.server.rest.bodies.EditTeamBody;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TeamsController {

    private final TeamsRepository repository;
    private final AppCore appCore;

    public TeamsController(TeamsRepository repository, AppCore appCore) {
        this.repository = repository;
        this.appCore = appCore;
    }

    @CrossOrigin
    @PostMapping(value = "/teams")
    public ResponseEntity<Response<Boolean>> addTeam(@RequestBody AddTeamBody body) {

        boolean check = repository.add(body.getName(),
                body.getPatron(),
                appCore.getCurrentUser().getUserId());

        //Assign first of assigned teams of users
        List<Team> usersTeams = repository.getByUserId(appCore.getCurrentUser().getUserId());
        if (!usersTeams.isEmpty()) {
            appCore.setCurrentTeam(usersTeams.get(0));
        }

        return new ResponseEntity<>(new Response<>(
                check,
                appCore.getCurrentUser().getUserId()),
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @GetMapping(value = "/teams")
    public ResponseEntity<Response<List<Team>>> getTeams() {
        return new ResponseEntity<>(new Response<>(
                repository.getByUserId(appCore.getCurrentUser().getUserId()),
                appCore.getCurrentUser().getUserId()),
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @PatchMapping(value = "/teams{teamId}")
    public ResponseEntity<Response<Boolean>> editTeam(@PathVariable int teamId, @RequestBody EditTeamBody body) {
        return new ResponseEntity<>(new Response<>(
                repository.update(teamId,
                        body.getName(),
                        body.getPatron()),
                appCore.getCurrentUser().getUserId()),
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @DeleteMapping(value = "/teams{teamId}")
    public ResponseEntity<Response<Boolean>> deleteTeam(@PathVariable int teamId) {
        return new ResponseEntity<>(new Response<>(
                repository.deleteById(teamId),
                appCore.getCurrentUser().getUserId()),
                HttpStatus.ACCEPTED);
    }
}