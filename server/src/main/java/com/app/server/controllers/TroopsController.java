package com.app.server.controllers;

import com.app.server.database.troops.TroopsRepository;
import com.app.server.model.Troop;
import com.app.server.api.Response;
import com.app.server.api.data.AddTroopBody;
import com.app.server.api.data.EditTroopBody;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TroopsController {

    private final TroopsRepository repository;

    public TroopsController(TroopsRepository repository) {
        this.repository = repository;
    }

    @CrossOrigin
    @PostMapping(value = "/api/{userId}/troops")
    public Response<Boolean> addTroop(@PathVariable int userId,
                                      @RequestBody AddTroopBody body) {
        Boolean data = repository.add(
                body.getName(),
                userId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @GetMapping(value = "/api/{userId}/team/{teamId}/troops")
    public Response<List<Troop>> getTroops(@PathVariable int userId,
                                           @PathVariable int teamId) {
        List<Troop> data = repository.getAllByTeamId(teamId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @PatchMapping(value = "/api/{userId}/troops/{troopId}")
    public Response<Boolean> editTroop(@PathVariable int userId,
                                       @PathVariable int troopId,
                                       @RequestBody EditTroopBody body) {
        Boolean data = repository.editTroop(troopId, body.getName());

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @DeleteMapping(value = "/api/{userId}/troops/{troopId}")
    public Response<Boolean> editTroop(@PathVariable int userId,
                                       @PathVariable int troopId) {
        Boolean data = repository.deleteById(troopId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }
}



