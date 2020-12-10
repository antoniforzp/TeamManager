package com.app.logic.database.ranks;

import com.app.logic.AppContext;
import com.app.logic.database.journeys.JourneysRepository;
import com.app.logic.database.journeys.JourneysRepositoryManager;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class RanksRepositoryManagerTest {

    private final RanksRepository repository = AppContext.getContext().getBean(RanksRepositoryManager.class);

    @Test
    void add() {
        System.out.println(repository.add("Wywiadowca", "wyw.", 14, 16));
    }

    @Test
    void getAll() {
        repository.getAll().forEach(System.out::println);
    }

    @Test
    void getById() {
        System.out.println(repository.getById(1));
    }

    @Test
    void deleteById() {
        System.out.println(repository.deleteById(2));
        repository.getAll().forEach(System.out::println);
    }
}
