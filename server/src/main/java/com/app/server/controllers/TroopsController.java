package com.app.server.controllers;

import com.app.server.core.AppCore;
import com.app.server.database.troops.TroopsRepository;
import com.app.server.model.Troop;
import com.app.server.rest.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TroopsController {

    private final TroopsRepository repository;
    private final AppCore appCore;

    public TroopsController(TroopsRepository repository, AppCore appCore) {
        this.repository = repository;
        this.appCore = appCore;
    }

    @CrossOrigin
    @GetMapping(value = "/troops")
    public ResponseEntity<Response<List<Troop>>> getTroops() {
        return new ResponseEntity<>(new Response<>(
                repository.getAllByTeamId(appCore.getCurrentTeam().getTeamId()),
                appCore.getCurrentUser().getUserId()),
                HttpStatus.ACCEPTED);
    }
}



