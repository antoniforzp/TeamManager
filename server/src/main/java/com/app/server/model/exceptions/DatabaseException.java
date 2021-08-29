package com.app.server.model.exceptions;

import lombok.Getter;
import lombok.ToString;
import org.springframework.dao.DataAccessException;

import java.util.Date;

@ToString
public class DatabaseException extends RuntimeException {

    @Getter
    private final String message;

    @Getter
    private final Date occurred;

    public DatabaseException(DataAccessException ex) {
        super(ex.getMessage());

        this.message = ex.getMessage();
        this.occurred = new Date();
    }
}
