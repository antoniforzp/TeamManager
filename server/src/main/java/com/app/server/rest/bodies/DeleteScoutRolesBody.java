package com.app.server.rest.bodies;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class DeleteScoutRolesBody {

    private final List<Integer> rolesIds;

    @JsonCreator
    public DeleteScoutRolesBody(@JsonProperty List<Integer> rolesIds) {
        this.rolesIds = rolesIds;
    }

    public List<Integer> getRolesIds() {
        return rolesIds;
    }
}
