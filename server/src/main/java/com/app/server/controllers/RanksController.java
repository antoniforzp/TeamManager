package com.app.server.controllers;

import com.app.server.database.ranks.RanksRepository;
import com.app.server.model.Rank;
import com.app.server.api.Response;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RanksController {

    private final RanksRepository ranksRepository;

    public RanksController(RanksRepository ranksRepository) {
        this.ranksRepository = ranksRepository;
    }

    @CrossOrigin
    @GetMapping(value = "/api/{userId}/ranks")
    public Response<List<Rank>> getRanks(@PathVariable int userId) {
        List<Rank> data = ranksRepository.getAll();

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }
}
