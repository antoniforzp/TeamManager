package com.app.server.model;

import java.util.Date;
import java.util.Objects;

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

    private final Troop troop;
    private final Rank rank;
    private final InstructorRank instructorRank;

    public Scout() {
        this.scoutId = 0;
        this.name = "name";
        this.surname = "surname";
        this.pesel = "00000000000";
        this.birthDate = new Date();
        this.address = "address";
        this.postalCode = "postalCode";
        this.city = "city";
        this.phone = "phone";
        this.troop = new Troop();
        this.rank = new Rank();
        this.instructorRank = new InstructorRank();
    }

    public Scout(int scoutId,
                 String name,
                 String surname,
                 String pesel,
                 Date birthDate,
                 String address,
                 String postalCode,
                 String city,
                 String phone,
                 Troop troop,
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
        this.troop = troop;
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

    public Troop getTroop() {
        return troop;
    }

    public Rank getRank() {
        return rank;
    }

    public InstructorRank getInstructorRank() {
        return instructorRank;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Scout scout = (Scout) o;
        return scoutId == scout.scoutId && name.equals(scout.name) && surname.equals(scout.surname) && pesel.equals(scout.pesel) && birthDate.equals(scout.birthDate) && address.equals(scout.address) && postalCode.equals(scout.postalCode) && city.equals(scout.city) && phone.equals(scout.phone) && troop.equals(scout.troop) && rank.equals(scout.rank) && instructorRank.equals(scout.instructorRank);
    }

    @Override
    public int hashCode() {
        return Objects.hash(scoutId, name, surname, pesel, birthDate, address, postalCode, city, phone, troop, rank, instructorRank);
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
                ", troop=" + troop +
                ", rank=" + rank +
                ", instructorRank=" + instructorRank +
                '}';
    }
}


