package com.app.server.controllers;

import com.app.server.database.roles.RolesRepository;
import com.app.server.database.scouts.ScoutsRepository;
import com.app.server.model.Role;
import com.app.server.model.Scout;
import com.app.server.api.Response;
import com.app.server.api.data.AddScoutBody;
import com.app.server.api.data.AddScoutRolesBody;
import com.app.server.api.data.EditScoutBody;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ScoutsController {

    private final ScoutsRepository scoutsRepository;
    private final RolesRepository rolesRepository;

    public ScoutsController(ScoutsRepository scoutsRepository, RolesRepository rolesRepository) {
        this.scoutsRepository = scoutsRepository;
        this.rolesRepository = rolesRepository;
    }

    @CrossOrigin
    @PostMapping(value = "/api/{userId}/team/{teamId}/scouts")
    public Response<Boolean> addScout(@PathVariable int userId,
                                      @PathVariable int teamId,
                                      @RequestBody AddScoutBody body) {
        Boolean data = scoutsRepository.add(body.getName(),
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

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @PostMapping(value = "/api/{userId}/scouts/{scoutId}/roles/{roleId}")
    public Response<Boolean> addRole(@PathVariable int userId,
                                     @PathVariable int scoutId,
                                     @PathVariable int roleId) {
        Boolean data = scoutsRepository.addRole(scoutId, roleId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @PostMapping(value = "/api/{userId}/scouts/{scoutId}/roles")
    public Response<Boolean> addRoles(@PathVariable int userId,
                                      @PathVariable int scoutId,
                                      @RequestBody AddScoutRolesBody body) {
        boolean data = true;
        for (int roleId : body.getRolesId()) {
            data = scoutsRepository.addRole(scoutId, roleId);
            if (!data) break;
        }

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @GetMapping(value = "/api/{userId}/team/{teamId}/scouts")
    public Response<List<Scout>> getScouts(@PathVariable int userId,
                                           @PathVariable int teamId) {
        List<Scout> data = scoutsRepository.getAllByTeamId(teamId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @GetMapping(value = "/api/{userId}/scouts/{scoutId}")
    public Response<Scout> getScout(@PathVariable int userId,
                                    @PathVariable int scoutId) {
        Scout data = scoutsRepository.getById(scoutId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @GetMapping(value = "/api/{userId}/team/{teamId}/scouts/roles")
    public Response<List<Role>> getAllRoles(@PathVariable int userId,
                                            @PathVariable int teamId) {
        List<Role> data = rolesRepository.getAllInTeam(teamId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @GetMapping(value = "/api/{userId}/scouts/{scoutId}/roles")
    public Response<List<Role>> getScoutRoles(@PathVariable int userId,
                                              @PathVariable int scoutId) {
        List<Role> data = rolesRepository.getAllByScoutId(scoutId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @PatchMapping(value = "/api/{userId}/scouts/{scoutId}")
    public Response<Boolean> editScout(@PathVariable int userId,
                                       @PathVariable int scoutId,
                                       @RequestBody EditScoutBody body) {
        Boolean data = scoutsRepository.update(scoutId,
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

        return new Response<>(
                data,
                userId,
                HttpStatus.CREATED);
    }

    @CrossOrigin
    @DeleteMapping(value = "/api/{userId}/scouts{scoutId}")
    public Response<Boolean> deleteScout(@PathVariable int userId,
                                         @PathVariable int scoutId) {
        Boolean data = scoutsRepository.deleteById(scoutId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @DeleteMapping(value = "/api/{userId}/scouts{scoutId}/roles")
    public Response<Boolean> deleteScoutRoles(@PathVariable int userId,
                                              @PathVariable int scoutId) {
        Boolean data = scoutsRepository.deleteAllRoles(scoutId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @DeleteMapping(value = "/api/{userId}/scouts{scoutId}/roles{roleId}")
    public Response<Boolean> deleteScoutRole(@PathVariable int userId,
                                             @PathVariable int scoutId,
                                             @PathVariable int roleId) {
        Boolean data = scoutsRepository.deleteRole(scoutId, roleId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }
}
