package com.app.logic.database.teams;

import com.app.logic.model.Team;

import java.util.List;

public interface TeamsRepository {

    int count();

    boolean add(String name, String patron, int ownerId);

    List<Team> getAll();

    List<Team> getByUserId(int userId);

    Team getById(int teamId);

    boolean update(int teamID, String name, String patron);

    boolean deleteById(int teamId);
}
