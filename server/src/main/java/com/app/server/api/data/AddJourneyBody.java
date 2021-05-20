package com.app.server.api.data;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Date;

public class AddJourneyBody {

    private final String title;
    private final String place;
    private final Date date;
    private final Date endDate;

    @JsonCreator
    public AddJourneyBody(@JsonProperty String title,
                          @JsonProperty String place,
                          @JsonProperty Date date,
                          @JsonProperty Date endDate) {
        this.title = title;
        this.place = place;
        this.date = date;
        this.endDate = endDate;
    }

    public String getTitle() {
        return title;
    }

    public String getPlace() {
        return place;
    }

    public Date getDate() {
        return date;
    }

    public Date getEndDate() {
        return endDate;
    }
}
