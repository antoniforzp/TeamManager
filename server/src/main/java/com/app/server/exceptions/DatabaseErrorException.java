package com.app.server.exceptions;

public class DatabaseErrorException extends RuntimeException {

    public DatabaseErrorException() {
        super("Database error exception");
    }

    public DatabaseErrorException(String databaseResponse) {
        super(databaseResponse);
    }


}
