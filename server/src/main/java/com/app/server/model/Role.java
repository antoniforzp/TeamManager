package com.app.server.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@ToString
@AllArgsConstructor
public class Role {

    @Getter
    private final int roleId;

    @Getter
    private final String name;

    @Getter
    private final Integer scoutId;
}
