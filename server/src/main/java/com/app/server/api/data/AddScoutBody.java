package com.app.server.api.data;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.ToString;

import java.util.Date;

@ToString
public class AddScoutBody {

    @Getter
    private final String name;

    @Getter
    private final String surname;

    @Getter
    private final String pesel;

    @Getter
    private final Date birthDate;

    @Getter
    private final String address;

    @Getter
    private final String postalCode;

    @Getter
    private final String city;

    @Getter
    private final String phone;

    @Getter
    private final int patrolId;

    @Getter
    private final int rankId;

    @Getter
    private final int instructorRankId;

    @JsonCreator
    public AddScoutBody(@JsonProperty String name,
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
        this.name = name;
        this.surname = surname;
        this.pesel = pesel;
        this.birthDate = birthDate;
        this.address = address;
        this.postalCode = postalCode;
        this.city = city;
        this.phone = phone;
        this.patrolId = patrolId;
        this.rankId = rankId;
        this.instructorRankId = instructorRankId;
    }
}
