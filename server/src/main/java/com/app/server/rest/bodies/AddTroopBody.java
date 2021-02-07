package com.app.server.rest.bodies;

import com.app.server.rest.Body;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class AddTroopBody implements Body {

    private final String name;

    @JsonCreator
    public AddTroopBody(@JsonProperty String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
