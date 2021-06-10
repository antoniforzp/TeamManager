package com.app.server.api.data;

import com.app.server.model.Role;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@ToString
public class EditRolesBody {

    @Getter
    private final List<Role> newRoles;

    @JsonCreator
    public EditRolesBody(@JsonProperty List<Role> newRoles) {
        this.newRoles = newRoles;
    }
}
