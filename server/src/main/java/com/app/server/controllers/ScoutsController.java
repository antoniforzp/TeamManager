package com.app.server.controllers;

import com.app.server.database.rolesService.RolesService;
import com.app.server.database.scoutsService.ScoutsService;
import com.app.server.model.Role;
import com.app.server.model.Scout;
import com.app.server.api.Response;
import com.app.server.api.data.AddScoutBody;
import com.app.server.api.data.EditScoutBody;
import lombok.SneakyThrows;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@CrossOrigin
@RestController
public class ScoutsController {

    private final ScoutsService scoutsService;
    private final RolesService rolesService;

    public ScoutsController(ScoutsService scoutsService, RolesService rolesService) {
        this.scoutsService = scoutsService;
        this.rolesService = rolesService;
    }

    @SneakyThrows
    @PostMapping(value = "/api/{userId}/team/{teamId}/scouts")
    public Response<Boolean> addScout(@PathVariable int userId,
                                      @PathVariable int teamId,
                                      @RequestBody AddScoutBody body) {

        CompletableFuture<Boolean> data = scoutsService.add(body.getName(),
                body.getSurname(),
                body.getPesel(),
                body.getBirthDate(),
                body.getAddress(),
                body.getPostalCode(),
                body.getCity(),
                body.getPhone(),
                body.getPatrolId(),
                body.getRankId(),
                body.getInstructorRankId(),
                teamId);
        CompletableFuture.allOf(data).join();

        return new Response<>(
                data.get(),
                userId,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @PostMapping(value = "/api/{userId}/scouts/{scoutId}/roles/{roleId}")
    public Response<Boolean> addRole(@PathVariable int userId,
                                     @PathVariable int scoutId,
                                     @PathVariable int roleId) {

        CompletableFuture<Boolean> data = scoutsService.addRole(scoutId, roleId);
        CompletableFuture.allOf(data).join();

        return new Response<>(
                data.get(),
                userId,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @GetMapping(value = "/api/{userId}/team/{teamId}/scouts")
    public Response<List<Scout>> getScouts(@PathVariable int userId,
                                           @PathVariable int teamId) {

        CompletableFuture<List<Scout>> data = scoutsService.getAllByTeamId(teamId);
        CompletableFuture.allOf(data).join();

        return new Response<>(
                data.get(),
                userId,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @GetMapping(value = "/api/{userId}/scouts/{scoutId}")
    public Response<Scout> getScout(@PathVariable int userId,
                                    @PathVariable int scoutId) {

        CompletableFuture<Scout> data = scoutsService.getById(scoutId);
        CompletableFuture.allOf(data).join();

        return new Response<>(
                data.get(),
                userId,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @GetMapping(value = "/api/{userId}/team/{teamId}/scouts/roles")
    public Response<List<Role>> getAllRoles(@PathVariable int userId,
                                            @PathVariable int teamId) {

        CompletableFuture<List<Role>> data = rolesService.getAllInTeam(teamId);
        CompletableFuture.allOf(data).join();

        return new Response<>(
                data.get(),
                userId,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @GetMapping(value = "/api/{userId}/scouts/{scoutId}/roles")
    public Response<List<Role>> getScoutRoles(@PathVariable int userId,
                                              @PathVariable int scoutId) {

        CompletableFuture<List<Role>> data = rolesService.getAllByScoutId(scoutId);
        CompletableFuture.allOf(data).join();

        return new Response<>(
                data.get(),
                userId,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @PatchMapping(value = "/api/{userId}/scouts/{scoutId}")
    public Response<Boolean> editScout(@PathVariable int userId,
                                       @PathVariable int scoutId,
                                       @RequestBody EditScoutBody body) {
        CompletableFuture<Boolean> data = scoutsService.update(scoutId,
                body.getName(),
                body.getSurname(),
                body.getPesel(),
                body.getBirthDate(),
                body.getAddress(),
                body.getPostalCode(),
                body.getCity(),
                body.getPhone(),
                body.getPatrolId(),
                body.getRankId(),
                body.getInstructorRankId());
        CompletableFuture.allOf(data).join();

        return new Response<>(
                data.get(),
                userId,
                HttpStatus.CREATED);
    }

    @SneakyThrows
    @DeleteMapping(value = "/api/{userId}/scouts{scoutId}")
    public Response<Boolean> deleteScout(@PathVariable int userId,
                                         @PathVariable int scoutId) {

        CompletableFuture<Boolean> data = scoutsService.deleteById(scoutId);
        CompletableFuture.allOf(data).join();

        return new Response<>(
                data.get(),
                userId,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @DeleteMapping(value = "/api/{userId}/scouts{scoutId}/roles")
    public Response<Boolean> deleteScoutRoles(@PathVariable int userId,
                                              @PathVariable int scoutId) {

        CompletableFuture<Boolean> data = scoutsService.deleteAllRoles(scoutId);
        CompletableFuture.allOf(data).join();

        return new Response<>(
                data.get(),
                userId,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @DeleteMapping(value = "/api/{userId}/scouts{scoutId}/roles{roleId}")
    public Response<Boolean> deleteScoutRole(@PathVariable int userId,
                                             @PathVariable int scoutId,
                                             @PathVariable int roleId) {

        CompletableFuture<Boolean> data = scoutsService.deleteRole(scoutId, roleId);
        CompletableFuture.allOf(data).join();

        return new Response<>(
                data.get(),
                userId,
                HttpStatus.ACCEPTED);
    }
}
