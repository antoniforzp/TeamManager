package com.app.server.api.data;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.ToString;

import java.util.Date;

@ToString
public class AddMeetingBody {

    @Getter
    private final String title;

    @Getter
    private final String place;

    @Getter
    private final Date date;

    @JsonCreator
    public AddMeetingBody(@JsonProperty String title,
                          @JsonProperty String place,
                          @JsonProperty Date date) {
        this.title = title;
        this.place = place;
        this.date = date;
    }
}
