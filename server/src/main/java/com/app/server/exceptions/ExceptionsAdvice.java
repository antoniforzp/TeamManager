package com.app.server.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class ExceptionsAdvice {

    @ResponseBody
    @ExceptionHandler(DatabaseErrorException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    String databaseErrorExceptionHandler(DatabaseErrorException e) {
        return e.getMessage();
    }
}