package com.app.server.database.instructorRanks;

import com.app.server.model.InstructorRank;

import java.util.List;

public interface InstructorRanksRepository {

    boolean add(String name, String abbreviation);

    List<InstructorRank> getAll();

    InstructorRank getById(int rankId);

    boolean deleteById(int rankId);
}
