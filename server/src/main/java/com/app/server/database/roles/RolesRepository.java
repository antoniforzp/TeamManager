package com.app.server.database.roles;

import com.app.server.model.Role;

import java.util.List;

public interface RolesRepository {

    boolean add(String name);

    List<Role> getAll();

    Role getById(int roleId);

    boolean deleteById(int roleId);
}
