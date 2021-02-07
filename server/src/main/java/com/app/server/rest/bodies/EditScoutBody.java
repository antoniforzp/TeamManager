package com.app.server.rest.bodies;

import com.app.server.rest.Body;

import java.util.Date;

public class EditScoutBody extends AddScoutBody implements Body {

    public EditScoutBody(String name, String surname, String pesel, Date birthDate, String address, String postalCode, String city, String phone, int troopId, int rankId, int instructorRankId) {
        super(name, surname, pesel, birthDate, address, postalCode, city, phone, troopId, rankId, instructorRankId);
    }
}
