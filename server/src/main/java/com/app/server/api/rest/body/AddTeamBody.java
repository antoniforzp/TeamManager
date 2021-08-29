package com.app.server.api.rest.body;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.ToString;

@ToString
public class AddTeamBody {

    @Getter
    private final String name;

    @Getter
    private final String patron;

    @JsonCreator
    public AddTeamBody(@JsonProperty String name,
                       @JsonProperty String patron) {
        this.name = name;
        this.patron = patron;
    }
}
