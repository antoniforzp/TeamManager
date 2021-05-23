package com.app.server.controllers;

import com.app.server.database.patrolsService.PatrolsService;
import com.app.server.model.Patrol;
import com.app.server.api.Response;
import com.app.server.api.data.AddPatrolBody;
import com.app.server.api.data.EditPatrolBody;
import lombok.SneakyThrows;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@CrossOrigin
@RestController
public class PatrolsController {

    private final PatrolsService service;

    public PatrolsController(PatrolsService service) {
        this.service = service;
    }

    @SneakyThrows
    @PostMapping(value = "/api/{userId}/patrols")
    public Response<Boolean> addPatrol(@PathVariable int userId,
                                       @RequestBody AddPatrolBody body) {

        CompletableFuture<Boolean> data = service.add(
                body.getName(),
                userId);
        CompletableFuture.allOf(data).join();

        return new Response<>(
                data.get(),
                userId,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @GetMapping(value = "/api/{userId}/team/{teamId}/patrols")
    public Response<List<Patrol>> getPatrols(@PathVariable int userId,
                                             @PathVariable int teamId) {

        CompletableFuture<List<Patrol>> data = service.getAllByTeamId(teamId);
        CompletableFuture.allOf(data).join();

        return new Response<>(
                data.get(),
                userId,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @PatchMapping(value = "/api/{userId}/patrols/{troopId}")
    public Response<Boolean> editPatrol(@PathVariable int userId,
                                        @PathVariable int troopId,
                                        @RequestBody EditPatrolBody body) {

        CompletableFuture<Boolean> data = service.update(troopId, body.getName());
        CompletableFuture.allOf(data).join();

        return new Response<>(
                data.get(),
                userId,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @DeleteMapping(value = "/api/{userId}/patrols/{troopId}")
    public Response<Boolean> deletePatrol(@PathVariable int userId,
                                          @PathVariable int troopId) {

        CompletableFuture<Boolean> data = service.deleteById(troopId);
        CompletableFuture.allOf(data).join();

        return new Response<>(
                data.get(),
                userId,
                HttpStatus.ACCEPTED);
    }
}



