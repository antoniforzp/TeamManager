package com.app.logic.database.meetings;

import com.app.logic.AppContext;
import org.junit.jupiter.api.Test;

import java.util.Date;

class MeetingsRepositoryManagerTest {

    private final MeetingsRepository repository = AppContext.getContext().getBean(MeetingsRepositoryManager.class);

    @Test
    void countByTeamId() {
        System.out.println(repository.countByTeamId(2));
        System.out.println(repository.countByTeamId(3));
    }

    @Test
    void add() {
        System.out.println(repository.add("Zbiórka", "Szkoła", new Date(), 0, 2));
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
        System.out.println(repository.deleteById(3));
    }
}
