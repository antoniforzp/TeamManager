package com.app.server.controllers;

import com.app.server.core.AppCore;
import com.app.server.database.teams.TeamsRepository;
import com.app.server.model.Team;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/teams")
public class TeamsController {

    private final TeamsRepository repository;
    private final AppCore appCore;

    public TeamsController(TeamsRepository repository, AppCore appCore) {
        this.repository = repository;
        this.appCore = appCore;
    }

    //PUT: Add team
    @CrossOrigin
    @PutMapping(value = "/add")
    public ResponseEntity<Boolean> addTeam(@RequestBody Team newTeam) {

        boolean check = repository.add(newTeam.getName(),
                newTeam.getPatron(),
                appCore.getCurrentUser().getUserId());

        //Assign first of assigned teams of users
        List<Team> usersTeams = repository.getByUserId(appCore.getCurrentUser().getUserId());
        if (!usersTeams.isEmpty()) {
            appCore.setCurrentTeam(usersTeams.get(0));
        }

        return new ResponseEntity<>(check,  HttpStatus.ACCEPTED);
    }

    //PUT: Add team with userId
    @CrossOrigin
    @PutMapping(value = "/add{teamId}")
    public ResponseEntity<Boolean> addTeam(@PathVariable int teamId, @RequestBody Team newTeam) {
        return new ResponseEntity<>(repository.add(newTeam.getName(),
                newTeam.getPatron(),
                teamId), HttpStatus.ACCEPTED);
    }

    //GET: Get all user's teams
    @CrossOrigin
    @GetMapping(value = "/list")
    public ResponseEntity<List<Team>> getTeams() {
        return new ResponseEntity<>(repository.getByUserId(appCore.getCurrentUser().getUserId()), HttpStatus.ACCEPTED);
    }

    //GET: Get number of user's teams
    @CrossOrigin
    @GetMapping(value = "/count")
    public ResponseEntity<Integer> countUserTeams() {
        return new ResponseEntity<>(repository.countUsers(), HttpStatus.ACCEPTED);
    }

    //POST: Edit team
    @CrossOrigin
    @PostMapping(value = "/edit{teamId}")
    public ResponseEntity<Boolean> editTeam(@PathVariable int teamId, @RequestBody Team newTeam) {
        return new ResponseEntity<>(repository.update(teamId,
                newTeam.getName(),
                newTeam.getPatron()), HttpStatus.ACCEPTED);
    }

    //DELETE: Remove team
    @CrossOrigin
    @DeleteMapping(value = "/remove{teamId}")
    public ResponseEntity<Boolean> removeTeam(@PathVariable int teamId) {
        return new ResponseEntity<>(repository.deleteById(teamId), HttpStatus.ACCEPTED);
    }
}