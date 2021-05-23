package com.app.server.database.scoutsService;

import com.app.server.model.Scout;

import java.util.Date;
import java.util.List;
import java.util.concurrent.CompletableFuture;

public interface ScoutsService {

    CompletableFuture<Boolean> add(String name,
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

    CompletableFuture<List<Scout>> getAllByTeamId(int teamId);

    CompletableFuture<List<Scout>> getAllByTeamIdTroopId(int teamId, int troopId);

    CompletableFuture<Scout> getById(int scoutId);

    CompletableFuture<Boolean> update(int scoutId,
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

    CompletableFuture<Boolean> addRole(int scoutId, int roleId);

    CompletableFuture<Boolean> deleteById(int scoutId);

    CompletableFuture<Boolean> deleteRole(int scoutId, int roleId);

    CompletableFuture<Boolean> deleteAllRoles(int scoutId);
}
