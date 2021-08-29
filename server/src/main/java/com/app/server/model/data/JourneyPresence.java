package com.app.server.model.data;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@ToString
@AllArgsConstructor
public class JourneyPresence {

    @Getter
    private final int journeyId;

    @Getter
    private final int scoutId;
}
