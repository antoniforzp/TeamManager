package com.app.server.rest.bodies;

import com.app.server.rest.Body;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Date;

public class AddMeetingBody implements Body {

    private final String title;
    private final String place;
    private final Date date;

    @JsonCreator
    public AddMeetingBody(@JsonProperty String title, @JsonProperty String place, @JsonProperty Date date) {
        this.title = title;
        this.place = place;
        this.date = date;
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
}
