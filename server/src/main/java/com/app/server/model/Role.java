package com.app.server.model;

import lombok.Getter;
import lombok.ToString;

@ToString
public class Role {

    @Getter
    private final int roleId;

    @Getter
    private final String name;

    @Getter
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
}
