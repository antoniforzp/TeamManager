package com.app.logic.database.roles;

import com.app.logic.AppContext;
import com.app.logic.database.ranks.RanksRepository;
import com.app.logic.database.ranks.RanksRepositoryManager;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class RolesRepositoryManagerTest {

    private final RolesRepository repository = AppContext.getContext().getBean(RolesRepositoryManager.class);

    @Test
    void add() {
        System.out.println(repository.add("Zastepowy"));
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
