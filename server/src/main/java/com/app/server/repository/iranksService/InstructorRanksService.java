package com.app.server.repository.iranksService;

import com.app.server.model.data.IRank;

import java.util.List;

public interface InstructorRanksService {

    Boolean add(String name, String abbreviation);

    List<IRank> getAll();

    IRank getById(int rankId);

    Boolean deleteById(int rankId);
}
