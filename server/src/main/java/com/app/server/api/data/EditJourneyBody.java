package com.app.server.api.data;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Date;

public class EditJourneyBody extends AddJourneyBody {

    @JsonCreator
    public EditJourneyBody(@JsonProperty String title,
                           @JsonProperty String place,
                           @JsonProperty Date startDate,
                           @JsonProperty Date endDate) {
        super(title, place, startDate, endDate);
    }
}
