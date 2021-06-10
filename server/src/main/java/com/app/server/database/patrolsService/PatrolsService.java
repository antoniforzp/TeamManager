package com.app.server.database.patrolsService;

import com.app.server.model.Patrol;

import java.util.List;

public interface PatrolsService {

    Boolean add(String name, int teamId);

    List<Patrol> getAllByTeamId(int teamId);

    Patrol getById(int patrolId);

    Boolean update(int patrolId, String name);

    Boolean deleteById(int patrolId);
}
