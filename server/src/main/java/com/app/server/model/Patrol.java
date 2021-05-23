package com.app.server.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@ToString
@AllArgsConstructor
public class Patrol {

    @Getter
    private final int troopId;

    @Getter
    private final String name;
}
