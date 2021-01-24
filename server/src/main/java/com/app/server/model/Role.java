package com.app.server.model;

import java.util.Objects;

public class Role {

    private final int roleId;
    private final String name;
    private final int scoutId;

    public Role() {
        this.roleId = 0;
        this.name = "name";
        this.scoutId = 0;
    }

    public Role(int roleId, String name, int scoutId) {
        this.roleId = roleId;
        this.name = name;
        this.scoutId = scoutId;
    }

    public int getRoleId() {
        return roleId;
    }

    public String getName() {
        return name;
    }

    public int getScoutId() {
        return scoutId;
    }

    @Override
    public String toString() {
        return "Role{" +
                "roleId=" + roleId +
                ", name='" + name + '\'' +
                ", scoutId=" + scoutId +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Role role = (Role) o;
        return roleId == role.roleId && scoutId == role.scoutId && name.equals(role.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(roleId, name, scoutId);
    }
}
