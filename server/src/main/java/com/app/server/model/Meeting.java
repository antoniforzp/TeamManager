package com.app.server.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

import java.util.Date;

@ToString
@AllArgsConstructor
public class Meeting {

    @Getter
    private final int meetingId;

    @Getter
    private final String title;

    @Getter
    private final String place;

    @Getter
    private final Date date;

    @Getter
    private final String description;
}
