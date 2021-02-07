package com.app.server.rest.bodies;

import com.app.server.rest.Body;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class DeleteScoutsBody implements Body {

    private final List<Integer> scoutIds;

    @JsonCreator
    public DeleteScoutsBody(@JsonProperty List<Integer> scoutIds) {
        this.scoutIds = scoutIds;
    }

    public List<Integer> getScoutIds() {
        return scoutIds;
    }
}
