package com.app.server.core.logic;

import com.app.server.api.rest.body.AddUserBody;
import com.app.server.api.rest.body.CheckUserBody;
import com.app.server.api.rest.body.EditUserBody;
import com.app.server.model.data.User;
import com.app.server.repository.settingsService.SettingsService;
import com.app.server.repository.usersService.UsersService;
import com.app.server.core.transactions.TransactionService;
import org.springframework.stereotype.Component;

@Component
public class UsersLogic {

    private final UsersService usersService;
    private final SettingsService settingsService;
    private final TransactionService transactionService;

    public UsersLogic(UsersService usersService,
                      SettingsService settingsService,
                      TransactionService transactionService) {

        this.usersService = usersService;
        this.settingsService = settingsService;
        this.transactionService = transactionService;
    }

    // UTILS

    public Boolean checkUser(CheckUserBody body) {
        return usersService.checkIfExists(body.getUserEmail());
    }

    // CREATE

    public Boolean addUser(AddUserBody body) {
        return transactionService.executeWithStatus(status -> {

            boolean check = false;
            // Add insert new user
            Integer newUserId = usersService.add(body.getName(),
                    body.getSurname(),
                    body.getPassword(),
                    body.getEmail());

            if (newUserId != null) {
                // Insert default settings to the user
                check = settingsService.addSettings(newUserId, "en", 1);
            }

            if (check) {
                return true;
            }

            status.setRollbackOnly();
            return false;
        });
    }

    // READ

    public User getUser(int userId) {
        return usersService.getById(userId);
    }

    // UPDATE

    public Boolean editUser(int userId, EditUserBody body) {
        return transactionService.execute(() -> usersService.update(userId,
                body.getName(),
                body.getSurname(),
                body.getPassword()));
    }

    // DELETE

    public Boolean deleteUser(int userId) {
        return transactionService.execute(() -> usersService.deleteById(userId));
    }
}
