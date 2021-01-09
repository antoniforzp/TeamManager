package com.app.server.controllers;

import com.app.server.core.AppCore;
import com.app.server.database.scouts.ScoutsRepository;
import com.app.server.model.Scout;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/scouts")
public class ScoutsController {

    private final ScoutsRepository repository;
    private final AppCore appCore;

    public ScoutsController(ScoutsRepository repository, AppCore appCore) {
        this.repository = repository;
        this.appCore = appCore;
    }

    //PUT: Add scout
    @CrossOrigin
    @PostMapping(value = "/add")
    public ResponseEntity<Boolean> addScout(@RequestBody Scout newScout) {
        return new ResponseEntity<>(repository.add(newScout.getName(),
                newScout.getSurname(),
                newScout.getPesel(),
                newScout.getBirthDate(),
                newScout.getAddress(),
                newScout.getPostalCode(),
                newScout.getCity(),
                newScout.getPhone(),
                newScout.getTroop().getTroopId(),
                newScout.getRank().getRankId(),
                newScout.getInstructorRank().getRankId(),
                appCore.getCurrentTeam().getTeamId()
        ), HttpStatus.ACCEPTED);
    }

    //PUT: add scout's role
    @CrossOrigin
    @PostMapping(value = "/add/role{scoutId}/{roleId}")
    public ResponseEntity<Boolean> addRole(@PathVariable int scoutId, @PathVariable int roleId) {
        return new ResponseEntity<>(repository.addRole(scoutId, roleId), HttpStatus.ACCEPTED);
    }

    //GET: List of scouts
    @CrossOrigin
    @GetMapping(value = "/list")
    public ResponseEntity<List<Scout>> getScouts() {
        return new ResponseEntity<>(repository.getAllByTeamId(appCore.getCurrentTeam().getTeamId()), HttpStatus.ACCEPTED);
    }

    //PUT: Edit scout
    @CrossOrigin
    @PostMapping(value = "/edit{scoutId}")
    public ResponseEntity<Boolean> editScout(@PathVariable int scoutId, @RequestBody Scout newScout) {
        return new ResponseEntity<>(repository.update(scoutId,
                newScout.getName(),
                newScout.getSurname(),
                newScout.getPesel(),
                newScout.getBirthDate(),
                newScout.getAddress(),
                newScout.getPostalCode(),
                newScout.getCity(),
                newScout.getPhone(),
                newScout.getTroop().getTroopId(),
                newScout.getRank().getRankId(),
                newScout.getInstructorRank().getRankId()
        ), HttpStatus.CREATED);
    }

    //DELETE: Remove scout
    @CrossOrigin
    @DeleteMapping(value = "/remove{scoutId}")
    public ResponseEntity<Boolean> deleteScout(@PathVariable int scoutId) {
        return new ResponseEntity<>(repository.deleteById(scoutId), HttpStatus.ACCEPTED);
    }

    //DELETE: Remove scout role
    @CrossOrigin
    @DeleteMapping(value = "/remove/role{scoutId}/{roleId}")
    public ResponseEntity<Boolean> deleteScoutRole(@PathVariable int scoutId, @PathVariable int roleId) {
        return new ResponseEntity<>(repository.deleteRole(scoutId, roleId), HttpStatus.ACCEPTED);
    }

    //DELETE: Remove all scout roles
    @CrossOrigin
    @DeleteMapping(value = "/remove/roles{scoutId}")
    public ResponseEntity<Boolean> deleteScoutRole(@PathVariable int scoutId) {
        return new ResponseEntity<>(repository.deleteAllRoles(scoutId), HttpStatus.ACCEPTED);
    }
}
