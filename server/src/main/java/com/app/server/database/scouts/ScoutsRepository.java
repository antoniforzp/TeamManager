package com.app.server.database.scouts;

import com.app.server.model.Scout;

import java.util.Date;
import java.util.List;

public interface ScoutsRepository {

    boolean add(String name,
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

    List<Scout> getAllByTeamId(int teamId);

    List<Scout> getAllByTeamIdTroopId(int teamId, int troopId);

    Scout getById(int scoutId);

    boolean update(int scoutId,
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

    boolean addRole(int scoutId, int roleId);

    boolean deleteById(int scoutId);

    boolean deleteRole(int scoutId, int roleId);

    boolean deleteAllRoles(int scoutId);
}
