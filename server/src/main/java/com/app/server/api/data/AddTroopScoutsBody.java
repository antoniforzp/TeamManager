package com.app.server.api.data;

import com.app.server.api.Body;
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
