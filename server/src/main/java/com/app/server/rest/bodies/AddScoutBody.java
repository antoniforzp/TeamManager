package com.app.server.rest.bodies;

import com.app.server.rest.Body;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Date;

public class AddScoutBody implements Body {

    private final String name;
    private final String surname;
    private final String pesel;
    private final Date birthDate;
    private final String address;
    private final String postalCode;
    private final String city;
    private final String phone;

    private final int troopId;
    private final int rankId;
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
                        @JsonProperty int troopId,
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
        this.troopId = troopId;
        this.rankId = rankId;
        this.instructorRankId = instructorRankId;
    }

    public String getName() {
        return name;
    }

    public String getSurname() {
        return surname;
    }

    public String getPesel() {
        return pesel;
    }

    public Date getBirthDate() {
        return birthDate;
    }

    public String getAddress() {
        return address;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public String getCity() {
        return city;
    }

    public String getPhone() {
        return phone;
    }

    public int getTroopId() {
        return troopId;
    }

    public int getRankId() {
        return rankId;
    }

    public int getInstructorRankId() {
        return instructorRankId;
    }
}
