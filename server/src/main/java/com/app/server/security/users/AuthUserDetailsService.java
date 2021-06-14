package com.app.server.security.users;

import com.app.server.database.teamsService.TeamsService;
import com.app.server.database.usersService.UsersService;
import com.app.server.model.Team;
import com.app.server.model.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AppUserDetailsService implements UserDetailsService {

    private final UsersService usersService;
    private final TeamsService teamsService;

    public AppUserDetailsService(UsersService usersService,
                                 TeamsService teamsService) {

        this.usersService = usersService;
        this.teamsService = teamsService;
    }

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        return new org.springframework.security.core.userdetails.User("admin@admin.com", "Admin1", new ArrayList<>());
    }

    public UserData getUserDataByUsername(String userName) throws UsernameNotFoundException {

        // Find user from the database
        List<User> users = usersService.getAll();


        // Custom data preparation
        User user = users.size() > 0 ? users.get(0) : null;
        Team initialTeam = null;

        if (user == null) {
            return new UserData(null, null, null);
        }

        // Find first team assigned to the user
        List<Team> userTeams = teamsService.getByUserId(user.getUserId());
        if (!userTeams.isEmpty()) {
            initialTeam = userTeams.get(0);
        }

        return new UserData(
                user,
                initialTeam,
                loadUserByUsername(user.getEmail())
        );
    }
}
