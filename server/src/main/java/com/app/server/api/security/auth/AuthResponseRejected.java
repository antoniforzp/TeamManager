package com.app.server.api.security.auth;

import com.app.server.api.security.LoginStatuses;
import com.fasterxml.jackson.annotation.JsonCreator;

public class AuthResponseRejected extends AuthResponse {

    @JsonCreator
    public AuthResponseRejected() {
        super(LoginStatuses.REJECTED, null, null, null);
    }
}
