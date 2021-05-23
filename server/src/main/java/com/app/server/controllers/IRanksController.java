package com.app.server.controllers;

import com.app.server.database.iranksService.InstructorRanksService;
import com.app.server.model.InstructorRank;
import com.app.server.api.Response;
import lombok.SneakyThrows;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@CrossOrigin
@RestController
public class IRanksController {

    private final InstructorRanksService service;

    public IRanksController(InstructorRanksService service) {
        this.service = service;
    }

    @SneakyThrows
    @GetMapping(value = "/api/{userId}/iranks")
    public Response<List<InstructorRank>> getInstructorRanks(@PathVariable int userId) {

        CompletableFuture<List<InstructorRank>> data = service.getAll();
        CompletableFuture.allOf(data).join();

        return new Response<>(
                data.get(),
                userId,
                HttpStatus.ACCEPTED);
    }
}
