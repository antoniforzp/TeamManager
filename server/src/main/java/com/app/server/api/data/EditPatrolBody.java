package com.app.server.api.data;

import com.app.server.api.Body;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class EditPatrolBody extends AddPatrolBody implements Body {

    @JsonCreator
    public EditPatrolBody(@JsonProperty String name) {
        super(name);
    }
}
