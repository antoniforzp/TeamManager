package com.app.server.controllers;

import com.app.server.database.patrols.PatrolRepository;
import com.app.server.model.Patrol;
import com.app.server.api.Response;
import com.app.server.api.data.AddPatrolBody;
import com.app.server.api.data.EditPatrolBody;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PatrolsController {

    private final PatrolRepository repository;

    public PatrolsController(PatrolRepository repository) {
        this.repository = repository;
    }

    @CrossOrigin
    @PostMapping(value = "/api/{userId}/patrols")
    public Response<Boolean> addPatrol(@PathVariable int userId,
                                       @RequestBody AddPatrolBody body) {
        Boolean data = repository.add(
                body.getName(),
                userId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @GetMapping(value = "/api/{userId}/team/{teamId}/patrols")
    public Response<List<Patrol>> getPatrols(@PathVariable int userId,
                                             @PathVariable int teamId) {
        List<Patrol> data = repository.getAllByTeamId(teamId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @PatchMapping(value = "/api/{userId}/patrols/{troopId}")
    public Response<Boolean> editPatrol(@PathVariable int userId,
                                        @PathVariable int troopId,
                                        @RequestBody EditPatrolBody body) {
        Boolean data = repository.edit(troopId, body.getName());

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @DeleteMapping(value = "/api/{userId}/patrols/{troopId}")
    public Response<Boolean> deletePatrol(@PathVariable int userId,
                                          @PathVariable int troopId) {
        Boolean data = repository.deleteById(troopId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }
}



