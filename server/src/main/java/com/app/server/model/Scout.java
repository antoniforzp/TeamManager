package com.app.server.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

import java.util.Date;

@ToString
@AllArgsConstructor
public class Scout {

    @Getter
    private final int scoutId;

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
    private final Patrol patrol;

    @Getter
    private final Rank rank;

    @Getter
    private final IRank iRank;
}


