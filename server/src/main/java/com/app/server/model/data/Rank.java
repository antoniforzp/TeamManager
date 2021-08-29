package com.app.server.model.data;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@ToString
@AllArgsConstructor
public class Rank {

    @Getter
    private final int rankId;

    @Getter
    private final String name;

    @Getter
    private final String abbreviation;

    @Getter
    private final int minAge;

    @Getter
    private final int maxAge;
}
