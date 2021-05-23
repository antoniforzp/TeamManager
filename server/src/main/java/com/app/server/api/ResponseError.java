package com.app.server.api;

import lombok.Getter;
import lombok.ToString;
import org.springframework.http.HttpStatus;

@ToString
public class ResponseError<T> extends Response<T> {

    @Getter
    private final String message;

    public ResponseError(T data,
                         Integer userId,
                         String message,
                         HttpStatus status) {
        super(data, userId, status);

        this.message = message;
    }
}
