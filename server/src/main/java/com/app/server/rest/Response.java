package com.app.server.rest;

import java.util.Date;

public class Response<T> {

    private final T response;
    private final Date created;
    private final int userId;

    public Response(T response, int userId) {
        this.response = response;
        this.created = new Date();
        this.userId = userId;
    }

    public Response(T response) {
        this.response = response;
        this.created = new Date();
        this.userId = -1;
    }

    public T getResponse() {
        return response;
    }
}
