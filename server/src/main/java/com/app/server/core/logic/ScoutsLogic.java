package com.app.server.core.logic;

import com.app.server.core.transactions.TransactionService;
import com.app.server.api.rest.body.AddScoutBody;
import com.app.server.api.rest.body.EditRolesBody;
import com.app.server.api.rest.body.EditScoutBody;
import com.app.server.model.data.Role;
import com.app.server.model.data.Scout;
import com.app.server.repository.rolesService.RolesService;
import com.app.server.repository.scoutsService.ScoutsService;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicBoolean;

@Component
public class ScoutsLogic {

    private final ScoutsService scoutsService;
    private final RolesService rolesService;
    private final TransactionService transactionService;

    public ScoutsLogic(ScoutsService scoutsService,
                       RolesService rolesService,
                       TransactionService transactionService) {

        this.scoutsService = scoutsService;
        this.rolesService = rolesService;
        this.transactionService = transactionService;
    }

    // CREATE

    public Boolean addScout(int teamId, AddScoutBody body) {
        return transactionService.execute(() -> {
            Integer scoutId = scoutsService.add(body.getName(),
                    body.getSurname(),
                    body.getPesel(),
                    body.getBirthDate(),
                    body.getAddress(),
                    body.getPostalCode(),
                    body.getCity(),
                    body.getPhone(),
                    body.getPatrolId(),
                    body.getRankId(),
                    body.getInstructorRankId(),
                    teamId);

            if (scoutId != null) {
                scoutsService.addRole(scoutId, 1); // 1 - Private
                return true;
            }

            return false;
        });
    }

    public Boolean addRole(int scoutId, int roleId) {
        return transactionService.execute(() -> scoutsService.addRole(scoutId, roleId));
    }

    // GET

    public List<Scout> getScouts(int teamId) {
        return scoutsService.getAllByTeamId(teamId);
    }

    public Scout getScout(int scoutId) {
        return scoutsService.getById(scoutId);
    }

    public List<Role> getAllRoles(int teamId) {
        return rolesService.getAllInTeam(teamId);
    }

    public List<Role> getScoutRoles(int scoutId) {
        return rolesService.getAllByScoutId(scoutId);
    }

    // UPDATE

    public Boolean editScout(int scoutId, EditScoutBody body) {
        return transactionService.execute(() -> scoutsService.update(scoutId,
                body.getName(),
                body.getSurname(),
                body.getPesel(),
                body.getBirthDate(),
                body.getAddress(),
                body.getPostalCode(),
                body.getCity(),
                body.getPhone(),
                body.getPatrolId(),
                body.getRankId(),
                body.getInstructorRankId()));
    }

    public Boolean editRoles(int scoutId, EditRolesBody body) {
        List<Role> changes = body.getNewRoles();
        List<Role> old = rolesService.getAllByScoutId(scoutId);

        List<Role> toAdd = new ArrayList<>();
        changes.forEach(role -> {
            boolean check = old.stream().noneMatch(x -> x.getRoleId() == role.getRoleId());
            if (check) {
                toAdd.add(role);
            }
        });

        List<Role> toDelete = new ArrayList<>();
        old.forEach(role -> {
            boolean check = changes.stream().noneMatch(x -> x.getRoleId() == role.getRoleId());
            if (check) {
                toDelete.add(role);
            }
        });

        return transactionService.execute(() -> {
            AtomicBoolean check = new AtomicBoolean(true);
            toAdd.forEach(role -> {
                if (!scoutsService.addRole(scoutId, role.getRoleId())) {
                    check.set(false);
                }
            });

            toDelete.forEach(role -> {
                if (!scoutsService.deleteRole(scoutId, role.getRoleId())) {
                    check.set(false);
                }
            });
            return check.get();
        });
    }

    // DELETE

    public Boolean deleteScout(int scoutId) {
        return transactionService.execute(() -> scoutsService.deleteById(scoutId));
    }

    public Boolean deleteScoutRole(int scoutId, int roleId) {
        return transactionService.execute(() -> scoutsService.deleteRole(scoutId, roleId));
    }
}
