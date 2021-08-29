package com.app.server.repository.patrolsService;

import com.app.server.model.data.Patrol;

import java.util.List;

public interface PatrolsService {

    Boolean add(String name, int teamId);

    List<Patrol> getAllByTeamId(int teamId);

    Patrol getById(int patrolId);

    Boolean update(int patrolId, String name);

    Boolean deleteById(int patrolId);
}
