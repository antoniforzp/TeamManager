package com.app.logic.database.teams;

import com.app.logic.AppContext;
import com.app.logic.database.users.UsersRepository;
import com.app.logic.database.users.UsersRepositoryManager;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class TeamsRepositoryManagerTest {

    private final TeamsRepository repository = AppContext.getContext().getBean(TeamsRepositoryManager.class);

    @Test
    void count() {
        System.out.println(repository.count());
    }

    @Test
    void add() {
        System.out.println(repository.add("Druzyna2", "Patron2", 0));
    }

    @Test
    void getAll() {
        repository.getAll().forEach(System.out::println);
    }

    @Test
    void getByUserId() {
        repository.getByUserId(0).forEach(System.out::println);
    }

    @Test
    void getById() {
        System.out.println(repository.getById(1));
    }

    @Test
    void update() {
        System.out.println(repository.update(2, "Druzynka", "Patronik"));
    }

    @Test
    void deleteById() {
        System.out.println(repository.deleteById(1));
    }
}
