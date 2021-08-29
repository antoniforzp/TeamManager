package com.app.server.api.rest.body;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.ToString;

import java.util.Date;

@ToString
public class EditJourneyBody extends AddJourneyBody {

    @JsonCreator
    public EditJourneyBody(@JsonProperty String title,
                           @JsonProperty String place,
                           @JsonProperty Date startDate,
                           @JsonProperty Date endDate,
                           @JsonProperty String description) {
        super(title, place, startDate, endDate, description);
    }
}
