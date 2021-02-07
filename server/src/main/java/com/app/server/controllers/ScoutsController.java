package com.app.server.controllers;

import com.app.server.core.AppCore;
import com.app.server.database.roles.RolesRepository;
import com.app.server.database.scouts.ScoutsRepository;
import com.app.server.model.Role;
import com.app.server.model.Scout;
import com.app.server.rest.Response;
import com.app.server.rest.bodies.AddScoutBody;
import com.app.server.rest.bodies.AddScoutRolesBody;
import com.app.server.rest.bodies.EditScoutBody;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ScoutsController {

    private final ScoutsRepository scoutsRepository;
    private final RolesRepository rolesRepository;
    private final AppCore appCore;

    public ScoutsController(ScoutsRepository scoutsRepository, RolesRepository rolesRepository, AppCore appCore) {
        this.scoutsRepository = scoutsRepository;
        this.rolesRepository = rolesRepository;
        this.appCore = appCore;
    }

    @CrossOrigin
    @PostMapping(value = "/scouts/add")
    public ResponseEntity<Response<Boolean>> addScout(@RequestBody AddScoutBody body) {
        appCore.checkCoreInit();
        return new ResponseEntity<>(new Response<>(
                scoutsRepository.add(body.getName(),
                        body.getSurname(),
                        body.getPesel(),
                        body.getBirthDate(),
                        body.getAddress(),
                        body.getPostalCode(),
                        body.getCity(),
                        body.getPhone(),
                        body.getTroopId(),
                        body.getRankId(),
                        body.getRankId(),
                        appCore.getCurrentTeam().getTeamId()),
                appCore.getCurrentUser().getUserId()),
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @PostMapping(value = "/scouts{scoutId}/roles{roleId}")
    public ResponseEntity<Response<Boolean>> addRole(@PathVariable int scoutId, @PathVariable int roleId) {
        appCore.checkCoreInit();
        return new ResponseEntity<>(new Response<>(
                scoutsRepository.addRole(scoutId, roleId),
                appCore.getCurrentUser().getUserId()),
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @PostMapping(value = "/scouts{scoutId}/roles")
    public ResponseEntity<Response<Boolean>> addRoles(@PathVariable int scoutId, @RequestBody AddScoutRolesBody body) {
        appCore.checkCoreInit();

        boolean check = true;
        for (int roleId : body.getRolesId()) {
            check = scoutsRepository.addRole(scoutId, roleId);
            if (!check) break;
        }
        return new ResponseEntity<>(new Response<>(
                check,
                appCore.getCurrentUser().getUserId()),
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @GetMapping(value = "/scouts")
    public ResponseEntity<Response<List<Scout>>> getScouts() {
        appCore.checkCoreInit();

        return new ResponseEntity<>(new Response<>(
                scoutsRepository.getAllByTeamId(appCore.getCurrentTeam().getTeamId()),
                appCore.getCurrentUser().getUserId()),
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @GetMapping(value = "/scouts{scoutId}")
    public ResponseEntity<Response<Scout>> getScout(@PathVariable int scoutId) {
        appCore.checkCoreInit();

        return new ResponseEntity<>(new Response<>(
                scoutsRepository.getById(scoutId),
                appCore.getCurrentUser().getUserId()),
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @GetMapping(value = "/scouts/roles")
    public ResponseEntity<Response<List<Role>>> getAllRoles() {
        appCore.checkCoreInit();

        return new ResponseEntity<>(new Response<>(
                rolesRepository.getAllInTeam(appCore.getCurrentTeam().getTeamId()),
                appCore.getCurrentUser().getUserId()),
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @GetMapping(value = "/scouts{scoutId}/roles")
    public ResponseEntity<Response<List<Role>>> getScoutRoles(@PathVariable int scoutId) {
        appCore.checkCoreInit();

        return new ResponseEntity<>(new Response<>(
                rolesRepository.getAllByScoutId(scoutId),
                appCore.getCurrentUser().getUserId()),
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @PatchMapping(value = "/scouts{scoutId}")
    public ResponseEntity<Response<Boolean>> editScout(@PathVariable int scoutId, @RequestBody EditScoutBody body) {
        appCore.checkCoreInit();

        return new ResponseEntity<>(new Response<>(
                scoutsRepository.update(scoutId,
                        body.getName(),
                        body.getSurname(),
                        body.getPesel(),
                        body.getBirthDate(),
                        body.getAddress(),
                        body.getPostalCode(),
                        body.getCity(),
                        body.getPhone(),
                        body.getTroopId(),
                        body.getRankId(),
                        body.getRankId()),
                appCore.getCurrentUser().getUserId()),
                HttpStatus.CREATED);
    }

    @CrossOrigin
    @DeleteMapping(value = "/scouts{scoutId}")
    public ResponseEntity<Response<Boolean>> deleteScout(@PathVariable int scoutId) {
        appCore.checkCoreInit();

        return new ResponseEntity<>(new Response<>(
                scoutsRepository.deleteById(scoutId),
                appCore.getCurrentUser().getUserId()),
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @DeleteMapping(value = "/scouts{scoutId}/roles")
    public ResponseEntity<Response<Boolean>> deleteScoutRoles(@PathVariable int scoutId) {
        appCore.checkCoreInit();

        return new ResponseEntity<>(new Response<>(
                scoutsRepository.deleteAllRoles(scoutId),
                appCore.getCurrentUser().getUserId()),
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @DeleteMapping(value = "/scouts{scoutId}/roles{roleId}")
    public ResponseEntity<Response<Boolean>> deleteScoutRole(@PathVariable int scoutId, @PathVariable int roleId) {
        appCore.checkCoreInit();

        return new ResponseEntity<>(new Response<>(
                scoutsRepository.deleteRole(scoutId, roleId),
                appCore.getCurrentUser().getUserId()),
                HttpStatus.ACCEPTED);
    }
}
