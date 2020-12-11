package com.app.logic.database.troops;

import com.app.logic.model.Troop;

import java.util.List;

public interface TroopsRepository {

    boolean add(String name, int troopId);

    List<Troop> getAllByTeamId(int teamId);

    Troop getById(int troopId);

    boolean deleteById(int troopId);
}
