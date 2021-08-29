package com.app.server.api.controllers;

import com.app.server.api.rest.response.Response;
import com.app.server.api.rest.body.AddPatrolBody;
import com.app.server.api.rest.body.EditPatrolBody;
import com.app.server.core.logic.PatrolsLogic;
import com.app.server.model.data.Patrol;
import lombok.SneakyThrows;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
public class PatrolsController {

    private final PatrolsLogic logic;

    public PatrolsController(PatrolsLogic logic) {
        this.logic = logic;
    }

    // Transactional
    @SneakyThrows
    @PostMapping(value = "/api/{userId}/team/{teamId}/patrols")
    public Response<Boolean> addPatrol(@PathVariable int userId,
                                       @PathVariable int teamId,
                                       @RequestBody AddPatrolBody body) {

        Boolean data = logic.addPatrol(teamId, body);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @GetMapping(value = "/api/{userId}/team/{teamId}/patrols")
    public Response<List<Patrol>> getPatrols(@PathVariable int userId,
                                             @PathVariable int teamId) {

        List<Patrol> data = logic.getPatrols(teamId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    // Transactional
    @PatchMapping(value = "/api/{userId}/patrols/{patrolId}")
    public Response<Boolean> editPatrol(@PathVariable int userId,
                                        @PathVariable int patrolId,
                                        @RequestBody EditPatrolBody body) {

        Boolean data = logic.editPatrol(patrolId, body);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    // Transactional
    @SneakyThrows
    @DeleteMapping(value = "/api/{userId}/patrols/{patrolId}")
    public Response<Boolean> deletePatrol(@PathVariable int userId,
                                          @PathVariable int patrolId) {

        Boolean data = logic.deletePatrol(patrolId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }
}



