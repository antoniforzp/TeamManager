package com.app.server.utils;

public class CredentialsChecker {

    //todo: adjust to polish letters
    //todo: display somewhere on screen patterns simplified!

    public static boolean checkName(String name) {
        return name != null && name.matches("[A-Z][a-z]+");
    }

    public static boolean checkSurname(String surname) {
        return surname != null && surname.matches("[A-Z][a-z]+");
    }

    public static boolean checkEmail(String email) {
        return email != null && email.matches("[\\w\\d!#$%&'*+-=?^_`{|]+@[a-zA-z.]+");
    }

    public static boolean checkPassword(String password) {
        return password != null && password.matches("^\\S+$");
    }

    public static boolean checkPESEL(String PESEL) {
        return PESEL != null && PESEL.matches("[\\d]{11}");
    }

    public static boolean checkAddress(String address) {
        return address != null && address.matches("[A-Z][a-z]+ [\\d]+[A-Z/\\d]*");
    }

    public static boolean checkPostalCode(String postalCode) {
        return postalCode != null && postalCode.matches("[\\d-]+");
    }

    public static boolean checkCity(String city) {
        return city != null && city.matches("[A-Z][a-z]+");
    }

    public static boolean checkPhone(String phone) {
        return phone != null && phone.matches("[0-9]{9}");
    }

    public static boolean checkTeamName(String name) {
        return name != null && name.matches("[\\w\\d\\s]+");
    }

    public static boolean checkTeamPatron(String patron) {
        return patron != null && patron.matches("[\\w\\d\\s]+");
    }

    public static boolean checkTitle(String title) {
        return title != null && title.matches("[\\w\\d\\s]+");
    }

    public static boolean checkPlace(String place) {
        return place != null && place.matches("[\\w\\d\\s]+");
    }
}
