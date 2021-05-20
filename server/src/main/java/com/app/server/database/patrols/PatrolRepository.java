package com.app.server.database.patrols;

import com.app.server.model.Patrol;

import java.util.List;

public interface PatrolRepository {

    boolean add(String name, int patrolId);

    List<Patrol> getAllByTeamId(int teamId);

    Patrol getById(int patrolId);

    boolean edit(int patrolId, String name);

    boolean deleteById(int patrolId);
}
