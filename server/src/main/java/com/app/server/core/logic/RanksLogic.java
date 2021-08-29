package com.app.server.core.logic;

import com.app.server.repository.ranksService.RanksRepository;
import com.app.server.model.data.Rank;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class RanksLogic {

    private final RanksRepository service;

    public RanksLogic(RanksRepository service) {
        this.service = service;
    }

    // READ

    public List<Rank> getRanks() {
        return service.getAll();
    }
}
