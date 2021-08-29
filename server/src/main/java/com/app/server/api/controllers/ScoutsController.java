package com.app.server.api.controllers;

import com.app.server.core.logic.ScoutsLogic;
import com.app.server.api.rest.body.AddScoutBody;
import com.app.server.api.rest.body.EditRolesBody;
import com.app.server.api.rest.body.EditScoutBody;
import com.app.server.api.rest.response.Response;
import com.app.server.model.data.Role;
import com.app.server.model.data.Scout;
import lombok.SneakyThrows;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
public class ScoutsController {

    private final ScoutsLogic logic;

    public ScoutsController(ScoutsLogic logic) {
        this.logic = logic;
    }

    // Transactional
    @SneakyThrows
    @PostMapping(value = "/api/{userId}/team/{teamId}/scouts")
    public Response<Boolean> addScout(@PathVariable int userId,
                                      @PathVariable int teamId,
                                      @RequestBody AddScoutBody body) {

        Boolean data = logic.addScout(teamId, body);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    // Transactional
    @SneakyThrows
    @PostMapping(value = "/api/{userId}/scouts/{scoutId}/roles/{roleId}")
    public Response<Boolean> addRole(@PathVariable int userId,
                                     @PathVariable int scoutId,
                                     @PathVariable int roleId) {

        Boolean data = logic.addRole(scoutId, roleId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @GetMapping(value = "/api/{userId}/team/{teamId}/scouts")
    public Response<List<Scout>> getScouts(@PathVariable int userId,
                                           @PathVariable int teamId) {

        List<Scout> data = logic.getScouts(teamId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @GetMapping(value = "/api/{userId}/scouts/{scoutId}")
    public Response<Scout> getScout(@PathVariable int userId,
                                    @PathVariable int scoutId) {

        Scout data = logic.getScout(scoutId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @GetMapping(value = "/api/{userId}/team/{teamId}/scouts/roles")
    public Response<List<Role>> getAllRoles(@PathVariable int userId,
                                            @PathVariable int teamId) {

        List<Role> data = logic.getAllRoles(teamId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @GetMapping(value = "/api/{userId}/scouts/{scoutId}/roles")
    public Response<List<Role>> getScoutRoles(@PathVariable int userId,
                                              @PathVariable int scoutId) {

        List<Role> data = logic.getScoutRoles(scoutId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    // Transactional
    @SneakyThrows
    @PatchMapping(value = "/api/{userId}/scouts/{scoutId}")
    public Response<Boolean> editScout(@PathVariable int userId,
                                       @PathVariable int scoutId,
                                       @RequestBody EditScoutBody body) {

        Boolean data = logic.editScout(scoutId, body);

        return new Response<>(
                data,
                userId,
                HttpStatus.CREATED);
    }

    // Transactional
    @SneakyThrows
    @PatchMapping(value = "/api/{userId}/scouts/{scoutId}/roles")
    public Response<Boolean> editRoles(@PathVariable int userId,
                                       @PathVariable int scoutId,
                                       @RequestBody EditRolesBody body) {

        Boolean data = logic.editRoles(scoutId, body);

        return new Response<>(
                data,
                userId,
                HttpStatus.CREATED);
    }

    // Transactional
    @SneakyThrows
    @DeleteMapping(value = "/api/{userId}/scouts/{scoutId}")
    public Response<Boolean> deleteScout(@PathVariable int userId,
                                         @PathVariable int scoutId) {

        Boolean data = logic.deleteScout(scoutId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    // Transactional
    @SneakyThrows
    @DeleteMapping(value = "/api/{userId}/scouts{scoutId}/roles{roleId}")
    public Response<Boolean> deleteScoutRole(@PathVariable int userId,
                                             @PathVariable int scoutId,
                                             @PathVariable int roleId) {

        Boolean data = logic.deleteScoutRole(scoutId, roleId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }
}
