package com.app.server.model;

import java.util.Date;

public class Scout {

    private final int scoutId;
    private final String name;
    private final String surname;
    private final String pesel;
    private final Date birthDate;
    private final String address;
    private final String postalCode;
    private final String city;
    private final String phone;

    private final Patrol patrol;
    private final Rank rank;
    private final InstructorRank instructorRank;

    public Scout(int scoutId,
                 String name,
                 String surname,
                 String pesel,
                 Date birthDate,
                 String address,
                 String postalCode,
                 String city,
                 String phone,
                 Patrol patrol,
                 Rank rank,
                 InstructorRank instructorRank) {
        this.scoutId = scoutId;
        this.name = name;
        this.surname = surname;
        this.pesel = pesel;
        this.birthDate = birthDate;
        this.address = address;
        this.postalCode = postalCode;
        this.city = city;
        this.phone = phone;
        this.patrol = patrol;
        this.rank = rank;
        this.instructorRank = instructorRank;
    }

    public int getScoutId() {
        return scoutId;
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

    public Patrol getTroop() {
        return patrol;
    }

    public Rank getRank() {
        return rank;
    }

    public InstructorRank getInstructorRank() {
        return instructorRank;
    }

    @Override
    public String toString() {
        return "Scout{" +
                "scoutId=" + scoutId +
                ", name='" + name + '\'' +
                ", surname='" + surname + '\'' +
                ", pesel='" + pesel + '\'' +
                ", birthDate=" + birthDate +
                ", address='" + address + '\'' +
                ", postalCode='" + postalCode + '\'' +
                ", city='" + city + '\'' +
                ", phone='" + phone + '\'' +
                ", troop=" + patrol +
                ", rank=" + rank +
                ", instructorRank=" + instructorRank +
                '}';
    }
}


