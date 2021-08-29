package com.app.server.model.data;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@ToString
@AllArgsConstructor
public class Patrol {

    @Getter
    private final int patrolId;

    @Getter
    private final String name;
}
