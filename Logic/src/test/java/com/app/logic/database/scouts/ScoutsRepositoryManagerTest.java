package com.app.logic.database.scouts;

import com.app.logic.AppContext;
import com.app.logic.database.troops.TroopsRepository;
import com.app.logic.database.troops.TroopsRepositoryManager;
import org.junit.jupiter.api.Test;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;

class ScoutsRepositoryManagerTest {

    private final ScoutsRepository repository = AppContext.getContext().getBean(ScoutsRepositoryManager.class);

    @Test
    void countByTeamId() {
        System.out.println(repository.countByTeamId(1));
    }

    @Test
    void add() {
        System.out.println(repository.add("Name",
                "Surname",
                "00000000000",
                new Date(),
                "address",
                "99-999",
                "Lodz",
                "999999999",
                1,
                3,
                3,
                3));
    }

    @Test
    void getAllByTeamId() {
        repository.getAllByTeamId(1).forEach(System.out::println);
    }

    @Test
    void getAllByTeamIdTroopId() {
        repository.getAllByTeamIdTroopId(1,1).forEach(System.out::println);
    }

    @Test
    void getById() {
        System.out.println(repository.getById(1));
    }

    @Test
    void update() {
    }

    @Test
    void name() {
        repository.addRole(1, 1);
    }
}
