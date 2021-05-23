package com.app.server.database.patrolsService;

import com.app.server.model.Patrol;

import java.util.List;
import java.util.concurrent.CompletableFuture;

public interface PatrolsService {

    CompletableFuture<Boolean> add(String name, int patrolId);

    CompletableFuture<List<Patrol>> getAllByTeamId(int teamId);

    CompletableFuture<Patrol> getById(int patrolId);

    CompletableFuture<Boolean> update(int patrolId, String name);

    CompletableFuture<Boolean> deleteById(int patrolId);
}
