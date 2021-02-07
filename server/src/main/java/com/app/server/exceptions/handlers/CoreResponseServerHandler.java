package com.app.server.exceptions.handlers;

import com.app.server.rest.ExceptionResponse;
import com.app.server.exceptions.TeamNotSetException;
import com.app.server.exceptions.UserNotSetException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;

@ControllerAdvice
public class CoreResponseServerHandler {

    @ExceptionHandler(UserNotSetException.class)
    public ResponseEntity<ExceptionResponse> userNotSet(UserNotSetException ex) {
        ExceptionResponse response = new ExceptionResponse();
        response.setErrorCode("CONFLICT");
        response.setErrorMessage(ex.getMessage());
        response.setTimestamp(LocalDateTime.now());

        return new ResponseEntity<>(response, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(TeamNotSetException.class)
    public ResponseEntity<ExceptionResponse> teamNotSet(TeamNotSetException ex) {
        ExceptionResponse response = new ExceptionResponse();
        response.setErrorCode("CONFLICT");
        response.setErrorMessage(ex.getMessage());
        response.setTimestamp(LocalDateTime.now());

        return new ResponseEntity<>(response, HttpStatus.CONFLICT);
    }
}
