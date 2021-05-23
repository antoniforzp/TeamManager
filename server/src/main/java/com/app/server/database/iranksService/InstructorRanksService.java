package com.app.server.database.iranksService;

import com.app.server.model.InstructorRank;

import java.util.List;
import java.util.concurrent.CompletableFuture;

public interface InstructorRanksService {

    CompletableFuture<Boolean> add(String name, String abbreviation);

    CompletableFuture<List<InstructorRank>> getAll();

    CompletableFuture<InstructorRank> getById(int rankId);

    CompletableFuture<Boolean> deleteById(int rankId);
}
