package com.app.server.core.logic;

import com.app.server.api.rest.body.AddPatrolBody;
import com.app.server.api.rest.body.EditPatrolBody;
import com.app.server.repository.patrolsService.PatrolsService;
import com.app.server.model.data.Patrol;
import com.app.server.core.transactions.TransactionService;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PatrolsLogic {

    private final PatrolsService service;
    private final TransactionService transactionService;

    public PatrolsLogic(PatrolsService service,
                        TransactionService transactionService) {

        this.service = service;
        this.transactionService = transactionService;
    }

    // CREATE

    public Boolean addPatrol(int teamId, AddPatrolBody body) {
        return transactionService.execute(() -> service.add(body.getName(), teamId));
    }

    // READ

    public List<Patrol> getPatrols(int teamId) {
        return service.getAllByTeamId(teamId);
    }

    // UPDATE

    public Boolean editPatrol(int patrolId, EditPatrolBody body) {
        return transactionService.execute(() -> service.update(patrolId, body.getName()));
    }

    // DELETE

    public Boolean deletePatrol(int patrolId) {
        return transactionService.execute(() -> service.deleteById(patrolId));
    }
}
