package com.app.server.rest.bodies;

import com.app.server.rest.Body;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class DeleteTroopScoutsBody extends AddTroopScoutsBody implements Body {

    @JsonCreator
    public DeleteTroopScoutsBody(@JsonProperty List<Integer> scoutsIds) {
        super(scoutsIds);
    }
}
