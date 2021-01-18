package com.app.server.controllers;

import com.app.server.core.AppCore;
import com.app.server.database.teams.TeamsRepository;
import com.app.server.model.Team;
import com.app.server.model.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping(value = "/core")
public class CoreController {

    final private AppCore appCore;
    final private TeamsRepository teamsRepository;

    public CoreController(AppCore appCore, TeamsRepository teamsRepository) {
        this.appCore = appCore;
        this.teamsRepository = teamsRepository;
    }

    //TEST
    @CrossOrigin
    @PostMapping(value = "/test")
    public ResponseEntity<Boolean> test() {
        return new ResponseEntity<>(true, HttpStatus.ACCEPTED);
    }

    //PUT: Get current logged user
    @CrossOrigin
    @GetMapping(value = "/user")
    public ResponseEntity<User> getCurrentUser() {
        return new ResponseEntity<>(appCore.getCurrentUser(), HttpStatus.ACCEPTED);
    }

    //PUT: Get current chosen team
    @CrossOrigin
    @GetMapping(value = "/team")
    public ResponseEntity<Team> getCurrentTeam() {
        return new ResponseEntity<>(appCore.getCurrentTeam(), HttpStatus.ACCEPTED);
    }

    //POST: Set current chosen team
    @CrossOrigin
    @PostMapping(value = "/team{teamId}")
    public ResponseEntity<Boolean> setCurrentTeam(@PathVariable int teamId) {

        Team team = teamsRepository.getById(teamId);
        boolean check = (team != null);
        if(check){
            appCore.setCurrentTeam(team);
            return new ResponseEntity<>(true, HttpStatus.ACCEPTED);
        }
        return new ResponseEntity<>(false, HttpStatus.ACCEPTED);
    }
}
