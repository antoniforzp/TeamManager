package com.app.server.api.rest.body;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.ToString;

import java.util.Date;

@ToString
public class EditMeetingBody extends AddMeetingBody {

    @JsonCreator
    public EditMeetingBody(@JsonProperty String title,
                           @JsonProperty String place,
                           @JsonProperty Date date,
                           @JsonProperty String description) {
        super(title, place, date, description);
    }
}
