package com.app.logic.database.presence;

import com.app.logic.AppContext;
import com.app.logic.database.meetings.MeetingsRepository;
import com.app.logic.database.meetings.MeetingsRepositoryManager;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

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
        System.out.println(repository.remove(1, 1));
    }
}
