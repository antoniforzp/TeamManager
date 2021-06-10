package com.app.server.database.ranksService;

import com.app.server.model.Rank;

import java.util.List;
import java.util.concurrent.CompletableFuture;

public interface RanksRepository {

    Boolean add(String name, String abbreviation, int minAge, int maxAge);

    List<Rank> getAll();

    Rank getById(int rankId);

    Boolean deleteById(int rankId);
}
