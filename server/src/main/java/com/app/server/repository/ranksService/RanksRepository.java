package com.app.server.repository.ranksService;

import com.app.server.model.data.Rank;

import java.util.List;

public interface RanksRepository {

    Boolean add(String name, String abbreviation, int minAge, int maxAge);

    List<Rank> getAll();

    Rank getById(int rankId);

    Boolean deleteById(int rankId);
}
