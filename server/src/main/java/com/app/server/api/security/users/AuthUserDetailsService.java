package com.app.server.api.security.users;

import com.app.server.repository.teamsService.TeamsService;
import com.app.server.repository.usersService.UsersService;
import com.app.server.model.data.Team;
import com.app.server.model.data.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AuthUserDetailsService implements UserDetailsService {

    private final UsersService usersService;
    private final TeamsService teamsService;

    public AuthUserDetailsService(UsersService usersService,
                                  TeamsService teamsService) {

        this.usersService = usersService;
        this.teamsService = teamsService;
    }

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        User user = usersService.getByEmail(login);
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), new ArrayList<>());
    }

    public AuthUserData getUserDataByUsername(String login) throws UsernameNotFoundException {

        // Custom data preparation
        User user = usersService.getByEmail(login);
        Team initialTeam = null;

        if (user == null) {
            return new AuthUserData(null, null, null);
        }

        // Find first team assigned to the user
        List<Team> userTeams = teamsService.getByUserId(user.getUserId());
        if (!userTeams.isEmpty()) {
            initialTeam = userTeams.get(0);
        }

        return new AuthUserData(
                user,
                initialTeam,
                loadUserByUsername(user.getEmail())
        );
    }
}
