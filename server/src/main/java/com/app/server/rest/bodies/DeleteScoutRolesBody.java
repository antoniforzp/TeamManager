package com.app.server.rest.bodies;

import java.util.List;

public class DeleteScoutRolesBody {

    private final List<Integer> rolesIds;

    public DeleteScoutRolesBody(List<Integer> rolesIds) {
        this.rolesIds = rolesIds;
    }

    public List<Integer> getRolesIds() {
        return rolesIds;
    }
}
