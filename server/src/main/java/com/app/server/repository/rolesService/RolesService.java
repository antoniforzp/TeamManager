package com.app.server.repository.rolesService;

import com.app.server.model.data.Role;

import java.util.List;

public interface RolesService {

    Boolean add(String name);

    List<Role> getAll();

    List<Role> getAllInTeam(int teamId);

    List<Role> getAllByScoutId(int scoutId);

    Role getById(int roleId);

    Boolean deleteById(int roleId);
}
