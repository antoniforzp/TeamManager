package com.app.server.database.teamsService;

import com.app.server.model.Team;

import java.util.List;
import java.util.concurrent.CompletableFuture;

public interface TeamsService {

    Boolean add(String name, String patron, int ownerId);

    List<Team> getAll();

    List<Team> getByUserId(Integer userId);

    Team getById(int teamId);

    Boolean update(int teamID, String name, String patron);

    Boolean deleteById(int teamId);
}
