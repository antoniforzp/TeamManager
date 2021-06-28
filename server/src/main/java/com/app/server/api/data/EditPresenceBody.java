package com.app.server.api.data;

import com.app.server.model.Scout;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@ToString
public class EditPresenceBody {

    @Getter
    private final List<Scout> newScoutsPresent;

    @JsonCreator
    public EditPresenceBody(@JsonProperty List<Scout> newScoutsPresent) {
        this.newScoutsPresent = newScoutsPresent;
    }
}