package com.app.server.controllers;

import com.app.server.api.Response;
import com.app.server.api.data.AddPatrolBody;
import com.app.server.api.data.EditPatrolBody;
import com.app.server.database.patrolsService.PatrolsService;
import com.app.server.model.Patrol;
import com.app.server.transactions.TransactionService;
import lombok.SneakyThrows;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
public class PatrolsController {

    private final PatrolsService service;
    private final TransactionService transactionService;

    public PatrolsController(PatrolsService service,
                             TransactionService transactionService) {

        this.service = service;
        this.transactionService = transactionService;
    }

    // Transactional
    @SneakyThrows
    @PostMapping(value = "/api/{userId}/team/{teamId}/patrols")
    public Response<Boolean> addPatrol(@PathVariable int userId,
                                       @PathVariable int teamId,
                                       @RequestBody AddPatrolBody body) {

        Boolean data = transactionService.execute(() -> service.add(body.getName(), teamId));

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @GetMapping(value = "/api/{userId}/team/{teamId}/patrols")
    public Response<List<Patrol>> getPatrols(@PathVariable int userId,
                                             @PathVariable int teamId) {

        List<Patrol> data = service.getAllByTeamId(teamId);

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

        Boolean data = transactionService.execute(() -> service.update(patrolId, body.getName()));

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

        Boolean data = transactionService.execute(() -> service.deleteById(patrolId));

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }
}



