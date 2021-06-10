package com.app.server.database.iranksService;

import com.app.server.model.IRank;

import java.util.List;

public interface InstructorRanksService {

    Boolean add(String name, String abbreviation);

    List<IRank> getAll();

    IRank getById(int rankId);

    Boolean deleteById(int rankId);
}
