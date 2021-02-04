package com.app.server.controllers;

import com.app.server.core.AppCore;
import com.app.server.database.roles.RolesRepository;
import com.app.server.database.scouts.ScoutsRepository;
import com.app.server.model.Role;
import com.app.server.model.Scout;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/scouts")
public class ScoutsController {

    private final ScoutsRepository scoutsRepository;
    private final RolesRepository rolesRepository;
    private final AppCore appCore;

    public ScoutsController(ScoutsRepository scoutsRepository, RolesRepository rolesRepository, AppCore appCore) {
        this.scoutsRepository = scoutsRepository;
        this.rolesRepository = rolesRepository;
        this.appCore = appCore;
    }

    //PUT: Add scout
    @CrossOrigin
    @PostMapping(value = "/add")
    public ResponseEntity<Boolean> addScout(@RequestBody Scout newScout) {
        return new ResponseEntity<>(scoutsRepository.add(newScout.getName(),
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

    //POST: add scout's role
    @CrossOrigin
    @PostMapping(value = "/add/role{scoutId}/{roleId}")
    public ResponseEntity<Boolean> addRole(@PathVariable int scoutId, @PathVariable int roleId) {
        return new ResponseEntity<>(scoutsRepository.addRole(scoutId, roleId), HttpStatus.ACCEPTED);
    }

    //GET: List of scouts
    @CrossOrigin
    @GetMapping(value = "/list")
    public ResponseEntity<List<Scout>> getScouts() {
        return new ResponseEntity<>(scoutsRepository.getAllByTeamId(appCore.getCurrentTeam().getTeamId()), HttpStatus.ACCEPTED);
    }

    //GET: Get all roles by scoutId
    @CrossOrigin
    @GetMapping(value = "/roles/list{scoutId}")
    public ResponseEntity<List<Role>> getScoutRolesList(@PathVariable int scoutId) {
        return new ResponseEntity<>(rolesRepository.getAllByScoutId(scoutId), HttpStatus.ACCEPTED);
    }

    //GET: Get all roles of all scouts of the current team
    @CrossOrigin
    @GetMapping(value = "/roles/list/all")
    public ResponseEntity<List<Role>> getScoutRoles() {
        return new ResponseEntity<>(rolesRepository.getAllInTeam(appCore.getCurrentTeam().getTeamId()
        ), HttpStatus.ACCEPTED);
    }

    //PUT: Edit scout
    @CrossOrigin
    @PostMapping(value = "/edit{scoutId}")
    public ResponseEntity<Boolean> editScout(@PathVariable int scoutId, @RequestBody Scout newScout) {
        return new ResponseEntity<>(scoutsRepository.update(scoutId,
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
        return new ResponseEntity<>(scoutsRepository.deleteById(scoutId), HttpStatus.ACCEPTED);
    }

    //DELETE: Remove scout role
    @CrossOrigin
    @DeleteMapping(value = "/remove/role{scoutId}/{roleId}")
    public ResponseEntity<Boolean> deleteScoutRole(@PathVariable int scoutId, @PathVariable int roleId) {
        return new ResponseEntity<>(scoutsRepository.deleteRole(scoutId, roleId), HttpStatus.ACCEPTED);
    }

    //DELETE: Remove all scout roles
    @CrossOrigin
    @DeleteMapping(value = "/remove/roles{scoutId}")
    public ResponseEntity<Boolean> deleteScoutRole(@PathVariable int scoutId) {
        return new ResponseEntity<>(scoutsRepository.deleteAllRoles(scoutId), HttpStatus.ACCEPTED);
    }
}
