package com.app.server.exceptions.handlers;

import com.app.server.exceptions.DatabaseErrorException;
import com.app.server.exceptions.UserNotSetException;
import com.app.server.rest.ExceptionResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;

@ControllerAdvice
public class RestResponseDatabaseHandler {

    @ExceptionHandler(DatabaseErrorException.class)
    public ResponseEntity<ExceptionResponse> databaseError(UserNotSetException ex) {
        ExceptionResponse response = new ExceptionResponse();
        response.setErrorCode("CONFLICT");
        response.setErrorMessage(ex.getMessage());
        response.setTimestamp(LocalDateTime.now());

        return new ResponseEntity<>(response, HttpStatus.CONFLICT);
    }
}
