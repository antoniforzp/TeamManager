package com.app.server.api.data;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.ToString;

@ToString
public class EditTeamBody extends AddTeamBody {

    @JsonCreator
    public EditTeamBody(@JsonProperty String name,
                        @JsonProperty String patron) {
        super(name, patron);
    }
}
