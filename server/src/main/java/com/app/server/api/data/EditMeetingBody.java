package com.app.server.api.data;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Date;

public class EditMeetingBody extends AddMeetingBody {

    @JsonCreator
    public EditMeetingBody(@JsonProperty String title,
                           @JsonProperty String place,
                           @JsonProperty Date date) {
        super(title, place, date);
    }
}
