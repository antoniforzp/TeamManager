package com.app.server.rest.bodies;

import com.app.server.rest.Body;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class EditTeamBody extends AddTeamBody implements Body {

    @JsonCreator
    public EditTeamBody(@JsonProperty String name,
                        @JsonProperty String patron) {
        super(name, patron);
    }
}
