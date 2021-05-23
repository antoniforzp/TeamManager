package com.app.server.api.data;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.ToString;

@ToString
public class AddPatrolBody {

    @Getter
    private final String name;

    @JsonCreator
    public AddPatrolBody(@JsonProperty String name) {
        this.name = name;
    }
}
