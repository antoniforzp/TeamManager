package com.app.server.repository.teamsService;

import com.app.server.model.data.Team;

import java.util.List;

public interface TeamsService {

    Boolean add(String name, String patron, int ownerId);

    List<Team> getAll();

    List<Team> getByUserId(Integer userId);

    Team getById(int teamId);

    Boolean update(int teamID, String name, String patron);

    Boolean deleteById(int teamId);
}
