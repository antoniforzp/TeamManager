package com.app.server.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@ToString
@AllArgsConstructor
public class Team {

    @Getter
    private final int teamId;

    @Getter
    private final String name;

    @Getter
    private final String patron;
}
