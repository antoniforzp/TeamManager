package com.app.server.api.security.users;

import com.app.server.model.data.Team;
import com.app.server.model.data.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;
import org.springframework.security.core.userdetails.UserDetails;

@ToString
@AllArgsConstructor
public class AuthUserData {

    @Getter
    private final User user;

    @Getter
    private final Team initialTeam;

    @Getter
    private final UserDetails userDetails;

}
