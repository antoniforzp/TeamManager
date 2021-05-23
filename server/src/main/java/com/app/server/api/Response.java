package com.app.server.api;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;

public class Response<T> {

    @Getter
    private final T data;

    @Getter
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy hh:mm:ss")
    private final LocalDateTime timestamp;

    @Getter
    private final Integer userId;

    @Getter
    private final HttpStatus status;

    public Response(T data, Integer userId, HttpStatus status) {

        this.data = data;
        this.status = status;

        this.timestamp = LocalDateTime.now();
        this.userId = userId;
    }
}
