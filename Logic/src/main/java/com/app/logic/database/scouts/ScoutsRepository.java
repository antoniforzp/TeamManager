package com.app.logic.database.scouts;

import com.app.logic.model.Scout;

import java.util.Date;
import java.util.List;

public interface ScoutsRepository {

    int countByTeamId(int teamId);

    boolean add(String name,
                String surname,
                String pesel,
                Date birthDate,
                String address,
                String postalCode,
                String city,
                String phone,
                int teamId,
                int troopId,
                int rankId,
                int instructorRankId);

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
                   int troopId,
                   int rankId,
                   int instructorRankId);

    boolean addRole(int scoutId, int roleId);

    boolean deleteRole(int scoutId, int roleId);

    boolean deleteAllRoles(int scoutId);
}
