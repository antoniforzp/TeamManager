package com.app.server.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@ToString
@AllArgsConstructor
public class Language {

    @Getter
    private final String languageId;

    @Getter
    private final String name;
}
