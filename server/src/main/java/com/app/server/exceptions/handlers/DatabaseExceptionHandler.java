package com.app.server.exceptions.handlers;

import com.app.server.api.ResponseError;
import com.app.server.exceptions.DatabaseException;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.concurrent.ExecutionException;

@Order(Ordered.HIGHEST_PRECEDENCE)
@ControllerAdvice
public class DatabaseExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(DatabaseException.class)
    protected ResponseEntity<Object> handleEntityNotFound(ExecutionException ex) {

        return new ResponseError<>(null,
                -1,
                ex.getMessage(),
                HttpStatus.INTERNAL_SERVER_ERROR);
    }
}