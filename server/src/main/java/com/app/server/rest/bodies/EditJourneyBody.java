package com.app.server.rest.bodies;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Date;

public class EditJourneyBody extends AddJourneyBody {

    @JsonCreator
    public EditJourneyBody(@JsonProperty String title,
                           @JsonProperty String place,
                           @JsonProperty Date date,
                           @JsonProperty Date endDate) {
        super(title, place, date, endDate);
    }
}
