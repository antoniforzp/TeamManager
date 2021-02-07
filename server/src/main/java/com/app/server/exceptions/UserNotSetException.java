package com.app.server.exceptions;

import java.util.Date;

public class UserNotSetException extends RuntimeException {

    private final String message;
    private final Date occurred;

    public UserNotSetException() {
        this.message = "External Server Error: User is not set";
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
