package com.app.server.database.rolesService;

import com.app.server.model.Role;

import java.util.List;
import java.util.concurrent.CompletableFuture;

public interface RolesService {

    CompletableFuture<Boolean> add(String name);

    CompletableFuture<List<Role>> getAll();

    CompletableFuture<List<Role>> getAllInTeam(int teamId);

    CompletableFuture<List<Role>> getAllByScoutId(int scoutId);

    CompletableFuture<Role> getById(int roleId);

    CompletableFuture<Boolean> deleteById(int roleId);
}
