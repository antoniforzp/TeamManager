package com.app.logic.database.journeys;

import com.app.logic.AppContext;
import org.junit.jupiter.api.Test;

import java.util.Date;

class JourneysRepositoryManagerTest {

    private final JourneysRepository repository = AppContext.getContext().getBean(JourneysRepositoryManager.class);

    @Test
    void countByTeamId() {
        System.out.println(repository.countByTeamId(2));
    }

    @Test
    void add() {
        System.out.println(repository.add("Nowa wyprawa",
                "Swiat",
                new Date(),
                new Date(),
                10,
                1,
                2));
    }

    @Test
    void getAllByTeamId() {
        repository.getAllByTeamId(2).forEach(System.out::println);
    }

    @Test
    void getById() {
        System.out.println(repository.getById(2));
    }

    @Test
    void deleteById() {
        System.out.println(repository.deleteById(2));
    }
}
