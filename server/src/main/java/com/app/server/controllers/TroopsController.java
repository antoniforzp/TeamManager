package com.app.server.controllers;

import com.app.server.core.AppCore;
import com.app.server.database.troops.TroopsRepository;
import com.app.server.model.Role;
import com.app.server.model.Troop;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/troops")
public class TroopsController {

    private final TroopsRepository repository;
    private final AppCore appCore;

    public TroopsController(TroopsRepository repository, AppCore appCore) {
        this.repository = repository;
        this.appCore = appCore;
    }

    //GET: List of available troops of team
    @CrossOrigin
    @GetMapping(value = "/list")
    public ResponseEntity<List<Troop>> getTroops() {
        return new ResponseEntity<>(repository.getAllByTeamId(appCore.getCurrentTeam().getTeamId()),
                HttpStatus.ACCEPTED);
    }
}



