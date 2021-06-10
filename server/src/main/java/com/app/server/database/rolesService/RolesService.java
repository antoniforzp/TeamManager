package com.app.server.database.rolesService;

import com.app.server.model.Role;

import java.util.List;
import java.util.concurrent.CompletableFuture;

public interface RolesService {

    Boolean add(String name);

    List<Role> getAll();

    List<Role> getAllInTeam(int teamId);

    List<Role> getAllByScoutId(int scoutId);

    Role getById(int roleId);

    Boolean deleteById(int roleId);
}
