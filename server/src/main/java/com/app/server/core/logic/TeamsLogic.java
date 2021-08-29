package com.app.server.core.logic;

import com.app.server.api.rest.body.AddTeamBody;
import com.app.server.api.rest.body.EditTeamBody;
import com.app.server.repository.teamsService.TeamsService;
import com.app.server.model.data.Team;
import com.app.server.core.transactions.TransactionService;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class TeamsLogic {

    private final TeamsService service;
    private final TransactionService transactionService;

    public TeamsLogic(TeamsService service,
                      TransactionService transactionService) {

        this.service = service;
        this.transactionService = transactionService;
    }

    // CREATE

    public Boolean addTeam(int userId, AddTeamBody body) {
        return transactionService.execute(() -> service.add(body.getName(),
                body.getPatron(),
                userId));
    }

    // READ

    public Team getTeam(int teamId) {
        return service.getById(teamId);
    }

    public List<Team> getTeams(int userId){
        return service.getByUserId(userId);
    }

    // EDIT

    public Boolean editTeam(int teamId, EditTeamBody body){
        return transactionService.execute(() -> service.update(teamId,
                body.getName(),
                body.getPatron()));
    }

    // DELETE

    public Boolean deleteTeam(int teamId){
        return transactionService.execute(() -> service.deleteById(teamId));
    }

}
