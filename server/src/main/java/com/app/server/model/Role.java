package com.app.server.model;

public class Role {

    private final int roleId;
    private final String name;
    private int scoutId;

    public Role(int roleId, String name) {
        this.roleId = roleId;
        this.name = name;
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
}
