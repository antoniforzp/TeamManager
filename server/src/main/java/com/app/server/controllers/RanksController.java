package com.app.server.controllers;

import com.app.server.database.ranksService.RanksRepository;
import com.app.server.model.Rank;
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
public class RanksController {

    private final RanksRepository service;

    public RanksController(RanksRepository service) {
        this.service = service;
    }

    @SneakyThrows
    @GetMapping(value = "/api/{userId}/ranks")
    public Response<List<Rank>> getRanks(@PathVariable int userId) {

        CompletableFuture<List<Rank>> data = service.getAll();
        CompletableFuture.allOf(data).join();

        return new Response<>(
                data.get(),
                userId,
                HttpStatus.ACCEPTED);
    }
}
