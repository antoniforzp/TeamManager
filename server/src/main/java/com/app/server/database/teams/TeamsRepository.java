package com.app.server.database.teams;

import com.app.server.model.Team;

import java.util.List;

public interface TeamsRepository {

    boolean add(String name, String patron, int ownerId);

    List<Team> getAll();

    List<Team> getByUserId(int userId);

    Team getById(int teamId);

    boolean update(int teamID, String name, String patron);

    boolean deleteById(int teamId);
}
