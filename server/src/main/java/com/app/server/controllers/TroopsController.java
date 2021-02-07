package com.app.server.controllers;

import com.app.server.core.AppCore;
import com.app.server.database.troops.TroopsRepository;
import com.app.server.model.Troop;
import com.app.server.rest.Response;
import com.app.server.rest.bodies.AddTroopBody;
import com.app.server.rest.bodies.EditTroopBody;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    @PostMapping(value = "/troops")
    public ResponseEntity<Response<Boolean>> addTroop(@RequestBody AddTroopBody body) {
        return new ResponseEntity<>(new Response<>(
                repository.add(
                        body.getName(),
                        appCore.getCurrentTeam().getTeamId()),
                appCore.getCurrentUser().getUserId()),
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @GetMapping(value = "/troops")
    public ResponseEntity<Response<List<Troop>>> getTroops() {
        return new ResponseEntity<>(new Response<>(
                repository.getAllByTeamId(appCore.getCurrentTeam().getTeamId()),
                appCore.getCurrentUser().getUserId()),
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @PatchMapping(value = "/troops{troopId}")
    public ResponseEntity<Response<Boolean>> editTroop(@PathVariable int troopId, @RequestBody EditTroopBody body) {
        return new ResponseEntity<>(new Response<>(
                repository.editTroop(troopId, body.getName()),
                appCore.getCurrentUser().getUserId()),
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @DeleteMapping(value = "/troops{troopId}")
    public ResponseEntity<Response<Boolean>> editTroop(@PathVariable int troopId) {
        return new ResponseEntity<>(new Response<>(
                repository.deleteById(troopId),
                appCore.getCurrentUser().getUserId()),
                HttpStatus.ACCEPTED);
    }
}



