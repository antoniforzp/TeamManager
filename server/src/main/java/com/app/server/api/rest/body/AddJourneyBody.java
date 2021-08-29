package com.app.server.api.rest.body;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.ToString;

import java.util.Date;

@ToString
public class AddJourneyBody {

    @Getter
    private final String title;

    @Getter
    private final String place;

    @Getter
    private final Date date;

    @Getter
    private final Date endDate;

    @Getter
    private final String description;

    @JsonCreator
    public AddJourneyBody(@JsonProperty String title,
                          @JsonProperty String place,
                          @JsonProperty Date date,
                          @JsonProperty Date endDate,
                          @JsonProperty String description) {
        this.title = title;
        this.place = place;
        this.date = date;
        this.endDate = endDate;
        this.description = description;
    }
}
