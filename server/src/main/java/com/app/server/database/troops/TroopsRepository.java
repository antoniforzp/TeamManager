package com.app.server.database.troops;

import com.app.server.model.Troop;

import java.util.List;

public interface TroopsRepository {

    boolean add(String name, int troopId);

    List<Troop> getAllByTeamId(int teamId);

    Troop getById(int troopId);

    boolean editTroop(int troopId, String name);

    boolean deleteById(int troopId);

}
