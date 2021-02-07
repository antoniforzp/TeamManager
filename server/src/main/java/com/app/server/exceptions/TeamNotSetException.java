package com.app.server.exceptions;

import java.util.Date;

public class TeamNotSetException extends RuntimeException {

    private final String message;
    private final Date occurred;

    public TeamNotSetException() {
        this.message = "External Server Error: Team is not set";
        this.occurred = new Date();
    }

    @Override
    public String getMessage() {
        return message;
    }

    public Date getOccurred() {
        return occurred;
    }
}
