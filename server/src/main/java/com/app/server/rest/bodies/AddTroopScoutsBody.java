package com.app.server.rest.bodies;

import com.app.server.rest.Body;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class AddTroopScoutsBody implements Body {

    private final List<Integer> scoutsIds;

    @JsonCreator
    public AddTroopScoutsBody(@JsonProperty List<Integer> scoutsIds) {
        this.scoutsIds = scoutsIds;
    }

    public List<Integer> getScoutsIds() {
        return scoutsIds;
    }
}
