package com.app.server.rest;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;

public class Response<T> {

    private final T data;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy hh:mm:ss")
    private final LocalDateTime timestamp;
    private final int userId;

    public Response(T data, int userId) {
        this.data = data;
        this.timestamp = LocalDateTime.now();
        this.userId = userId;
    }

    public Response(T data) {
        this.data = data;
        this.timestamp = LocalDateTime.now();
        this.userId = -1;
    }

    public T getData() {
        return data;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public int getUserId() {
        return userId;
    }
}
