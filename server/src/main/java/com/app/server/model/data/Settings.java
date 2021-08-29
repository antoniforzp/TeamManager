package com.app.server.model.data;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@ToString
@AllArgsConstructor
public class Settings {

    @Getter
    private final int userId;

    @Getter
    private final Language language;

    @Getter
    private final Theme theme;
}
