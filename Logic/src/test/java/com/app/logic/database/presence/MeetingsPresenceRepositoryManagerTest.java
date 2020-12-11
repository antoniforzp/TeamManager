package com.app.logic.database.presence;

import com.app.logic.AppContext;
import org.junit.jupiter.api.Test;

class MeetingsPresenceRepositoryManagerTest {

    private final MeetingsPresenceRepository repository = AppContext.getContext().getBean(MeetingsPresenceRepositoryManager.class);

    @Test
    void countPresent() {
        System.out.println(repository.countPresent(1));
    }

    @Test
    void add() {
        repository.add(1, 1);
        repository.add(1, 4);
        repository.add(1, 6);
    }

    @Test
    void remove() {
        System.out.println(repository.delete(1, 1));
    }
}
