package com.app.server.rest.bodies;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class AddScoutRolesBody {

    private final List<Integer> rolesId;

    @JsonCreator
    public AddScoutRolesBody(@JsonProperty List<Integer> rolesId) {
        this.rolesId = rolesId;
    }

    public List<Integer> getRolesId() {
        return rolesId;
    }
}
