package com.app.logic.database.instructorRanks;

import com.app.logic.AppContext;
import com.app.logic.database.journeys.JourneysRepository;
import com.app.logic.database.journeys.JourneysRepositoryManager;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class InstructorRanksRepositoryManagerTest {

    private final InstructorRanksRepository repository = AppContext.getContext().getBean(InstructorRanksRepositoryManager.class);

    @Test
    void add() {
        System.out.println(repository.add("Podharcmistrz", "phm."));
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
    }
}
