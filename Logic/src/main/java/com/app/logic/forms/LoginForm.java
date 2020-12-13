package com.app.logic.forms;

public class LoginForm {

    private final String name;
    private final String surname;
    private final String password;
    private final String email;
    private final String teamName;
    private final String teamPatron;

    public LoginForm(String name, String surname, String password, String email, String teamName, String teamPatron) {
        this.name = name;
        this.surname = surname;
        this.password = password;
        this.email = email;
        this.teamName = teamName;
        this.teamPatron = teamPatron;
    }

    public String getName() {
        return name;
    }

    public String getSurname() {
        return surname;
    }

    public String getPassword() {
        return password;
    }

    public String getEmail() {
        return email;
    }

    public String getTeamName() {
        return teamName;
    }

    public String getTeamPatron() {
        return teamPatron;
    }
}
