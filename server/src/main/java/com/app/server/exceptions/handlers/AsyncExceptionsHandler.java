package com.app.server.exceptions.handlers;

import com.app.server.api.ResponseError;
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
public class AsyncExceptionsHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(InterruptedException.class)
    protected ResponseEntity<Object> handleInterruptedException(ExecutionException ex) {

        return new ResponseError<>(null,
                -1,
                ex.getMessage(),
                HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(ExecutionException.class)
    protected ResponseEntity<Object> handleExecutionException(ExecutionException ex) {

        return new ResponseError<>(null,
                -1,
                ex.getMessage(),
                HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
