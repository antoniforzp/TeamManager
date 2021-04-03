package com.app.server.controllers;

import com.app.server.core.AppCore;
import com.app.server.database.ranks.RanksRepository;
import com.app.server.model.Rank;
import com.app.server.rest.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RanksController {

    private final RanksRepository ranksRepository;
    private final AppCore appCore;

    public RanksController(RanksRepository ranksRepository, AppCore appCore) {
        this.ranksRepository = ranksRepository;
        this.appCore = appCore;
    }

    @CrossOrigin
    @GetMapping(value = "/ranks")
    public ResponseEntity<Response<List<Rank>>> getRanks() {
        appCore.checkCoreInit();
        return new ResponseEntity<>(new Response<>(
                ranksRepository.getAll(),
                appCore.getCurrentUser().getUserId()),
                HttpStatus.ACCEPTED);
    }
}
