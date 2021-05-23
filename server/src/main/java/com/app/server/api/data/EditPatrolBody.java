package com.app.server.api.data;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.ToString;

@ToString
public class EditPatrolBody extends AddPatrolBody {

    @JsonCreator
    public EditPatrolBody(@JsonProperty String name) {
        super(name);
    }
}
