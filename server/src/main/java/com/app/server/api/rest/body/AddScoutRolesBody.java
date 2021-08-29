package com.app.server.api.rest.body;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@ToString
public class AddScoutRolesBody {

    @Getter
    private final List<Integer> rolesId;

    @JsonCreator
    public AddScoutRolesBody(@JsonProperty List<Integer> rolesId) {
        this.rolesId = rolesId;
    }
}
