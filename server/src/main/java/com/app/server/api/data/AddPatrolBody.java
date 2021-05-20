package com.app.server.api.data;

import com.app.server.api.Body;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class AddPatrolBody implements Body {

    private final String name;

    @JsonCreator
    public AddPatrolBody(@JsonProperty String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
