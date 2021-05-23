package com.app.server.database.ranksService;

import com.app.server.model.Rank;

import java.util.List;
import java.util.concurrent.CompletableFuture;

public interface RanksRepository {

    CompletableFuture<Boolean> add(String name, String abbreviation, int minAge, int maxAge);

    CompletableFuture<List<Rank>> getAll();

    CompletableFuture<Rank> getById(int rankId);

    CompletableFuture<Boolean> deleteById(int rankId);
}
