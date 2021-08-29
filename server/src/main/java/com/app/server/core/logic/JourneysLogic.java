package com.app.server.core.logic;

import com.app.server.api.rest.body.AddJourneyBody;
import com.app.server.api.rest.body.EditJourneyBody;
import com.app.server.api.rest.body.EditPresenceBody;
import com.app.server.repository.journeysPresenceService.JourneysPresenceService;
import com.app.server.repository.journeysService.JourneysService;
import com.app.server.model.data.Journey;
import com.app.server.model.data.JourneyPresence;
import com.app.server.model.data.Scout;
import com.app.server.core.transactions.TransactionService;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicBoolean;

@Component
public class JourneysLogic {

    private final JourneysService jService;
    private final JourneysPresenceService jpService;
    private final TransactionService transactionService;

    public JourneysLogic(JourneysService jService,
                         JourneysPresenceService jpService,
                         TransactionService transactionService) {

        this.jService = jService;
        this.jpService = jpService;
        this.transactionService = transactionService;
    }

    // CREATE

    public Boolean addJourney(int teamId, AddJourneyBody body) {
        return transactionService.execute(() -> jService.add(body.getTitle(),
                body.getPlace(),
                body.getDate(),
                body.getEndDate(),
                body.getDescription(),
                teamId));

    }

    public Boolean addJourneyPresence(int journeyId, int scoutId) {
        return transactionService.execute(() -> jpService.add(journeyId, scoutId));
    }

    // READ

    public List<Journey> getJourneys(int teamId) {
        return this.jService.getAllByTeamId(teamId);
    }

    public List<JourneyPresence> getJourneysPresence(int journeyId) {
        return jpService.getPresenceById(journeyId);
    }

    public List<JourneyPresence> getJourneysPresenceTeam(int teamId) {
        return jpService.getPresenceByTeam(teamId);
    }

    // UPDATE

    public Boolean editJourneysPresence(int journeyId, EditPresenceBody body) {
        List<Scout> changes = body.getNewScoutsPresent();
        List<JourneyPresence> old = jpService.getPresenceById(journeyId);

        List<Integer> toAdd = new ArrayList<>();
        changes.forEach(scout -> {
            boolean check = old.stream().noneMatch(x -> x.getScoutId() == scout.getScoutId());
            if (check) {
                toAdd.add(scout.getScoutId());
            }
        });

        List<Integer> toDelete = new ArrayList<>();
        old.forEach(scout -> {
            boolean check = changes.stream().noneMatch(x -> x.getScoutId() == scout.getScoutId());
            if (check) {
                toDelete.add(scout.getScoutId());
            }
        });

        return transactionService.execute(() -> {
            AtomicBoolean check = new AtomicBoolean(true);
            toAdd.forEach(scoutId -> {
                if (!jpService.add(journeyId, scoutId)) {
                    check.set(false);
                }
            });

            toDelete.forEach(scoutId -> {
                if (!jpService.delete(journeyId, scoutId)) {
                    check.set(false);
                }
            });
            return check.get();
        });
    }

    public Boolean editJourney(int journeyId, EditJourneyBody body) {
        return transactionService.execute(() -> jService.update(journeyId,
                body.getTitle(),
                body.getPlace(),
                body.getDate(),
                body.getEndDate(),
                body.getDescription()));
    }

    // DELETE

    public Boolean deleteJourney(int journeyId) {
        return transactionService.execute(() -> jService.deleteById(journeyId));
    }

    public Boolean deleteJourneyPresence(int journeyId, int scoutId) {
        return transactionService.execute(() -> jpService.delete(journeyId, scoutId));
    }
}
