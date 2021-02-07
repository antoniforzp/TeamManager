package com.app.server.controllers;

import com.app.server.database.ranks.RanksRepository;
import com.app.server.model.Rank;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RanksController {

    private final RanksRepository ranksRepository;

    public RanksController(RanksRepository ranksRepository) {
        this.ranksRepository = ranksRepository;
    }

    @CrossOrigin
    @GetMapping(value = "/ranks")
    public ResponseEntity<List<Rank>> getRanks() {
        return new ResponseEntity<>(ranksRepository.getAll(), HttpStatus.ACCEPTED);
    }
}
