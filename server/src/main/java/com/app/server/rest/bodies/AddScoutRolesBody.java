package com.app.server.rest.bodies;

import java.util.List;

public class AddScoutRolesBody {

    private final List<Integer> rolesId;

    public AddScoutRolesBody(List<Integer> rolesId) {
        this.rolesId = rolesId;
    }

    public List<Integer> getRolesId() {
        return rolesId;
    }
}
