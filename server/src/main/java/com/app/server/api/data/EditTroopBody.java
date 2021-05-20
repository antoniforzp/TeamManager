package com.app.server.api.data;

import com.app.server.api.Body;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class EditTroopBody extends AddTroopBody implements Body {

    @JsonCreator
    public EditTroopBody(@JsonProperty String name) {
        super(name);
    }
}
