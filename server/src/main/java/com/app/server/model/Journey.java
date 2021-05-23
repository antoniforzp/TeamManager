package com.app.server.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

import java.util.Date;

@ToString
@AllArgsConstructor
public class Journey {

    @Getter
    private final int journeyId;

    @Getter
    private final String title;

    @Getter
    private final String place;

    @Getter
    private final Date startDate;

    @Getter
    private final Date endDate;
}
