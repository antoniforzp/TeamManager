package com.app.server.model.data;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@ToString
@AllArgsConstructor
public class Theme {

    @Getter
    private final int themeId;

    @Getter
    private final String name;

    @Getter
    private final String abbreviation;
}
