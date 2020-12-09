package com.app.logic.database.users;

import com.app.logic.AppContext;
import com.app.logic.model.User;
import org.junit.FixMethodOrder;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.runners.MethodSorters;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
class UsersRepositoryManagerTest {

    private final UsersRepository repository = AppContext.getContext().getBean(UsersRepositoryManager.class);

    @Test
    void tests() {
        add();
        addWithIndex();
        count();
        checkCredentials();
        checkIfExists();
        getAll();
        getByCredentials();
        update();
        deleteById();
        deleteByEmail();
    }

    void add() {
        Assertions.assertTrue(repository.add("Test1", "Test1", "Test1", "test1@test1.com"));
    }

    void addWithIndex() {
        Assertions.assertTrue(repository.add(-1, "Test2", "Test2", "Test2", "test2@test2.com"));
    }

    void count() {
        Assertions.assertTrue(repository.count() > 0);
    }

    void checkCredentials() {
        Assertions.assertFalse(repository.checkCredentials("???", "Test"));
        Assertions.assertFalse(repository.checkCredentials("test@test.com", "???"));
        Assertions.assertTrue(repository.checkCredentials("test1@test1.com", "Test1"));
    }

    void checkIfExists() {
        Assertions.assertFalse(repository.checkIfExists("???"));
        Assertions.assertTrue(repository.checkIfExists("test1@test1.com"));
    }

    void getAll() {
        Assertions.assertTrue(repository.getAll().size() > 0);
    }

    void getByCredentials() {
        User user = new User(-1, "Test2", "Test2", "Test2", "test2@test2.com");
        Assertions.assertEquals(user, repository.getByCredentials("test2@test2.com", "Test2"));
        Assertions.assertNotEquals(user, repository.getByCredentials("test1@test1.com", "Test1"));
        Assertions.assertNull(repository.getByCredentials("???", "???"));
    }

    void update() {
        User user = new User(-1, "Test3", "Test3", "Test3", "test2@test2.com");
        Assertions.assertTrue(repository.update(-1, "Test3", "Test3", "Test3"));
        Assertions.assertEquals(user, repository.getById(-1));
    }

    void deleteById() {
        Assertions.assertTrue(repository.deleteById(-1));
    }

    void deleteByEmail() {
        Assertions.assertTrue(repository.deleteByEmail("test1@test1.com"));
    }
}
