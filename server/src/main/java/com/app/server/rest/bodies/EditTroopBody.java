package com.app.server.rest.bodies;

import com.app.server.rest.Body;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class EditTroopBody extends AddTroopBody implements Body {

    @JsonCreator
    public EditTroopBody(@JsonProperty String name) {
        super(name);
    }
}
