package com.app.server.controllers;

import com.app.server.core.AppCore;
import com.app.server.database.teams.TeamsRepository;
import com.app.server.model.Team;
import com.app.server.model.User;
import com.app.server.rest.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class CoreController {

    final private AppCore appCore;
    final private TeamsRepository teamsRepository;

    public CoreController(AppCore appCore, TeamsRepository teamsRepository) {
        this.appCore = appCore;
        this.teamsRepository = teamsRepository;
    }

    @CrossOrigin
    @GetMapping(value = "/core/user")
    public ResponseEntity<Response<User>> getCurrentUser() {
        return new ResponseEntity<>(new Response<>(
                appCore.getCurrentUser(),
                appCore.getCurrentUser().getUserId()),
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @GetMapping(value = "/core/team")
    public ResponseEntity<Response<Team>> getCurrentTeam() {
        return new ResponseEntity<>(new Response<>(
                appCore.getCurrentTeam(),
                appCore.getCurrentUser().getUserId()),
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @PostMapping(value = "/core/team{teamId}")
    public ResponseEntity<Response<Boolean>> setCurrentTeam(@PathVariable int teamId) {
        Team team = teamsRepository.getById(teamId);
        boolean check = (team != null);
        if (check) {
            appCore.setCurrentTeam(team);
        }

        return new ResponseEntity<>(new Response<>(
                check,
                appCore.getCurrentUser().getUserId()),
                HttpStatus.ACCEPTED);
    }
}
