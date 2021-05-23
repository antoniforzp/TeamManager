package com.app.server.database.teamsService;

import com.app.server.model.Team;

import java.util.List;
import java.util.concurrent.CompletableFuture;

public interface TeamsService {

    CompletableFuture<Boolean> add(String name, String patron, int ownerId);

    CompletableFuture<List<Team>> getAll();

    CompletableFuture<List<Team>> getByUserId(Integer userId);

    CompletableFuture<Team> getById(int teamId);

    CompletableFuture<Boolean> update(int teamID, String name, String patron);

    CompletableFuture<Boolean> deleteById(int teamId);
}
