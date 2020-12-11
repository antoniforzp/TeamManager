package com.app.logic.database.presence;

public interface JourneysPresenceRepository {

    int countPresent(int journeyId);

    boolean add(int journeyId, int scoutId);

    boolean delete(int journeyId, int scoutId);
}
