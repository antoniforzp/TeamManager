package com.app.server.exceptions;

import org.springframework.dao.DataAccessException;

import java.util.Date;

public class DatabaseErrorException extends RuntimeException {

    private final String message;
    private final Date occurred;

    public DatabaseErrorException(DataAccessException ex) {
        super(ex.getMessage());

        this.message = ex.getMessage();
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
