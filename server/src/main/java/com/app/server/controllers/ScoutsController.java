package com.app.server.controllers;

import com.app.server.api.data.EditRolesBody;
import com.app.server.database.rolesService.RolesService;
import com.app.server.database.scoutsService.ScoutsService;
import com.app.server.model.Role;
import com.app.server.model.Scout;
import com.app.server.api.Response;
import com.app.server.api.data.AddScoutBody;
import com.app.server.api.data.EditScoutBody;
import com.app.server.transactions.TransactionService;
import lombok.SneakyThrows;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicBoolean;

@CrossOrigin
@RestController
public class ScoutsController {

    private final ScoutsService scoutsService;
    private final RolesService rolesService;
    private final TransactionService transactionService;

    public ScoutsController(ScoutsService scoutsService,
                            RolesService rolesService,
                            TransactionService transactionService) {

        this.scoutsService = scoutsService;
        this.rolesService = rolesService;
        this.transactionService = transactionService;
    }

    // Transactional
    @SneakyThrows
    @PostMapping(value = "/api/{userId}/team/{teamId}/scouts")
    public Response<Boolean> addScout(@PathVariable int userId,
                                      @PathVariable int teamId,
                                      @RequestBody AddScoutBody body) {

        Boolean data = transactionService.execute(() -> scoutsService.add(body.getName(),
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
                teamId));

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    // Transactional
    @SneakyThrows
    @PostMapping(value = "/api/{userId}/scouts/{scoutId}/roles/{roleId}")
    public Response<Boolean> addRole(@PathVariable int userId,
                                     @PathVariable int scoutId,
                                     @PathVariable int roleId) {

        Boolean data = transactionService.execute(() -> scoutsService.addRole(scoutId, roleId));

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @GetMapping(value = "/api/{userId}/team/{teamId}/scouts")
    public Response<List<Scout>> getScouts(@PathVariable int userId,
                                           @PathVariable int teamId) {

        List<Scout> data = scoutsService.getAllByTeamId(teamId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @GetMapping(value = "/api/{userId}/scouts/{scoutId}")
    public Response<Scout> getScout(@PathVariable int userId,
                                    @PathVariable int scoutId) {

        Scout data = scoutsService.getById(scoutId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @GetMapping(value = "/api/{userId}/team/{teamId}/scouts/roles")
    public Response<List<Role>> getAllRoles(@PathVariable int userId,
                                            @PathVariable int teamId) {

        List<Role> data = rolesService.getAllInTeam(teamId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @GetMapping(value = "/api/{userId}/scouts/{scoutId}/roles")
    public Response<List<Role>> getScoutRoles(@PathVariable int userId,
                                              @PathVariable int scoutId) {

        List<Role> data = rolesService.getAllByScoutId(scoutId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    // Transactional
    @SneakyThrows
    @PatchMapping(value = "/api/{userId}/scouts/{scoutId}")
    public Response<Boolean> editScout(@PathVariable int userId,
                                       @PathVariable int scoutId,
                                       @RequestBody EditScoutBody body) {

        Boolean data = transactionService.execute(() -> scoutsService.update(scoutId,
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
                body.getInstructorRankId()));

        return new Response<>(
                data,
                userId,
                HttpStatus.CREATED);
    }

    // Transactional
    @SneakyThrows
    @PatchMapping(value = "/api/{userId}/scouts/{scoutId}/roles")
    public Response<Boolean> editRoles(@PathVariable int userId,
                                       @PathVariable int scoutId,
                                       @RequestBody EditRolesBody body) {

        List<Role> changes = body.getNewRoles();
        List<Role> old = rolesService.getAllByScoutId(scoutId);

        List<Role> toAdd = new ArrayList<>();
        changes.forEach(role -> {
            boolean check = old.stream().noneMatch(x -> x.getRoleId() == role.getRoleId());
            if (check) {
                toAdd.add(role);
            }
        });

        List<Role> toDelete = new ArrayList<>();
        old.forEach(role -> {
            boolean check = changes.stream().noneMatch(x -> x.getRoleId() == role.getRoleId());
            if (check) {
                toDelete.add(role);
            }
        });

        Boolean data = transactionService.execute(() -> {
            AtomicBoolean check = new AtomicBoolean(true);
            toAdd.forEach(role -> {
                if (!scoutsService.addRole(scoutId, role.getRoleId())) {
                    check.set(false);
                }
            });

            toDelete.forEach(role -> {
                if (!scoutsService.deleteRole(scoutId, role.getRoleId())) {
                    check.set(false);
                }
            });
            return check.get();
        });

        return new Response<>(
                data,
                userId,
                HttpStatus.CREATED);
    }

    // Transactional
    @SneakyThrows
    @DeleteMapping(value = "/api/{userId}/scouts/{scoutId}")
    public Response<Boolean> deleteScout(@PathVariable int userId,
                                         @PathVariable int scoutId) {

        Boolean data = transactionService.execute(() -> scoutsService.deleteById(scoutId));

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    // Transactional
    @SneakyThrows
    @DeleteMapping(value = "/api/{userId}/scouts{scoutId}/roles{roleId}")
    public Response<Boolean> deleteScoutRole(@PathVariable int userId,
                                             @PathVariable int scoutId,
                                             @PathVariable int roleId) {

        Boolean data = transactionService.execute(() -> scoutsService.deleteRole(scoutId, roleId));

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }
}
