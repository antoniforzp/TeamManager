package com.app.server.core.logic;

import com.app.server.repository.iranksService.InstructorRanksService;
import com.app.server.model.data.IRank;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class IRanksLogic {

    private final InstructorRanksService service;

    public IRanksLogic(InstructorRanksService service) {
        this.service = service;
    }

    // READ

    public List<IRank> getInstructorRanks() {
        return this.service.getAll();
    }

}
