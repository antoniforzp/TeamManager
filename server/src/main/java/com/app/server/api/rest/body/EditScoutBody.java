package com.app.server.api.rest.body;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.ToString;

import java.util.Date;

@ToString
public class EditScoutBody extends AddScoutBody {

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
        super(name,
                surname,
                pesel,
                birthDate,
                address,
                postalCode,
                city,
                phone,
                patrolId,
                rankId,
                instructorRankId);
    }


}
