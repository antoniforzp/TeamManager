package com.app.server.rest.bodies;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class AddTeamBody {

    private final String name;
    private final String patron;

    @JsonCreator
    public AddTeamBody(@JsonProperty String name,
                       @JsonProperty String patron) {
        this.name = name;
        this.patron = patron;
    }

    public String getName() {
        return name;
    }

    public String getPatron() {
        return patron;
    }
}
