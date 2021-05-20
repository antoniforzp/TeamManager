package com.app.server.api.data;

import com.app.server.api.Body;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Date;

public class EditScoutBody extends AddScoutBody implements Body {

    @JsonCreator
    public EditScoutBody(@JsonProperty String name,
                         @JsonProperty String surname,
                         @JsonProperty String pesel,
                         @JsonProperty Date birthDate,
                         @JsonProperty String address,
                         @JsonProperty String postalCode,
                         @JsonProperty String city,
                         @JsonProperty String phone,
                         @JsonProperty int patrolId,
                         @JsonProperty int rankId,
                         @JsonProperty int instructorRankId) {
        super(name, surname, pesel, birthDate, address, postalCode, city, phone, patrolId, rankId, instructorRankId);
    }


}
