package com.app.server.api;

import com.app.server.api.error.ResponseError;
import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

public class Response<T> {

    private final T data;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy hh:mm:ss")
    private final LocalDateTime timestamp;
    private final Integer userId;
    private final HttpStatus status;

    public Response(T data, Integer userId, HttpStatus status, ResponseError error) {
        this.data = data;
        this.status = status;
        this.timestamp = LocalDateTime.now();
        this.userId = userId;
    }

    public Response(T data, Integer userId, HttpStatus status) {
        this.data = data;
        this.status = status;

        this.timestamp = LocalDateTime.now();
        this.userId = userId;
    }

    public T getData() {
        return data;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public Integer getUserId() {
        return userId;
    }

    public HttpStatus getStatus() {
        return status;
    }
}
