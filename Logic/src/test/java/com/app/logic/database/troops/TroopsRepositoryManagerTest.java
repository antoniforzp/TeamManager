package com.app.logic.database.troops;

import com.app.logic.AppContext;
import com.app.logic.database.teams.TeamsRepository;
import com.app.logic.database.teams.TeamsRepositoryManager;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class TroopsRepositoryManagerTest {

    private final TroopsRepository repository = AppContext.getContext().getBean(TroopsRepositoryManager.class);

    @Test
    void add() {
        System.out.println(repository.add("Młody zastępik", 2));
    }

    @Test
    void getAllByTeamId() {
        repository.getAllByTeamId(2).forEach(System.out::println);
    }

    @Test
    void getById() {
        System.out.println(repository.getById(1));
    }

    @Test
    void deleteById() {
        System.out.println(repository.deleteById(2));
    }
}
