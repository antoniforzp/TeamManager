package com.app.server.repository.scoutsService;

import com.app.server.model.data.Scout;

import java.util.Date;
import java.util.List;

public interface ScoutsService {

    Integer add(String name,
                String surname,
                String pesel,
                Date birthDate,
                String address,
                String postalCode,
                String city,
                String phone,
                int patrolId,
                int rankId,
                int instructorRankId,
                int teamId);

    Boolean addRole(int scoutId, int roleId);

    List<Scout> getAllByTeamId(int teamId);

    List<Scout> getAllByTeamIdPatrolId(int teamId, int patrolId);

    Scout getById(int scoutId);

    Boolean update(int scoutId,
                   String name,
                   String surname,
                   String pesel,
                   Date birthDate,
                   String address,
                   String postalCode,
                   String city,
                   String phone,
                   int patrolId,
                   int rankId,
                   int instructorRankId);

    Boolean deleteById(int scoutId);

    Boolean deleteRole(int scoutId, int roleId);
}
