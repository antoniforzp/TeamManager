package com.app.server.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@ToString
@AllArgsConstructor
public class IRank {

    @Getter
    private final int rankId;

    @Getter
    private final String name;

    @Getter
    private final String abbreviation;
}
