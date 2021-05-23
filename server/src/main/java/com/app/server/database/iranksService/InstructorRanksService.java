package com.app.server.database.iranksService;

import com.app.server.model.IRank;

import java.util.List;
import java.util.concurrent.CompletableFuture;

public interface InstructorRanksService {

    CompletableFuture<Boolean> add(String name, String abbreviation);

    CompletableFuture<List<IRank>> getAll();

    CompletableFuture<IRank> getById(int rankId);

    CompletableFuture<Boolean> deleteById(int rankId);
}
