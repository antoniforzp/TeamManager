package com.app.server.model;

public class User implements Model {

    private final int userId;
    private final String name;
    private final String surname;
    private final String password;
    private final String email;

    public User(int userId, String name, String surname, String password, String email) {
        this.userId = userId;
        this.name = name;
        this.surname = surname;
        this.password = password;
        this.email = email;
    }

    public int getUserId() {
        return userId;
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

    @Override
    public String toString() {
        return "User{" +
                "userId=" + userId +
                ", name='" + name + '\'' +
                ", surname='" + surname + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}
