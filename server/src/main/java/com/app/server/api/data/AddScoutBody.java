package com.app.server.api.data;

import com.app.server.api.Body;
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

    private final int patrolId;
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

    public int getPatrolId() {
        return patrolId;
    }

    public int getRankId() {
        return rankId;
    }

    public int getInstructorRankId() {
        return instructorRankId;
    }

    @Override
    public String toString() {
        return "AddScoutBody{" +
                "name='" + name + '\'' +
                ", surname='" + surname + '\'' +
                ", pesel='" + pesel + '\'' +
                ", birthDate=" + birthDate +
                ", address='" + address + '\'' +
                ", postalCode='" + postalCode + '\'' +
                ", city='" + city + '\'' +
                ", phone='" + phone + '\'' +
                ", troopId=" + patrolId +
                ", rankId=" + rankId +
                ", instructorRankId=" + instructorRankId +
                '}';
    }
}
