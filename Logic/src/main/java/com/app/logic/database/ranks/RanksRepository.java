package com.app.logic.database.ranks;

import com.app.logic.model.Rank;

import java.util.List;

public interface RanksRepository {

    boolean add(String name, String abbreviation, int minAge, int maxAge);

    List<Rank> getAll();

    Rank getById(int rankId);

    boolean deleteById(int rankId);
}
