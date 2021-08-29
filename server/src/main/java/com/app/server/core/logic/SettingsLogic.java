package com.app.server.core.logic;

import com.app.server.core.transactions.TransactionService;
import com.app.server.api.rest.body.EditSettingsBody;
import com.app.server.model.data.Language;
import com.app.server.model.data.Settings;
import com.app.server.model.data.Theme;
import com.app.server.repository.settingsService.SettingsService;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class SettingsLogic {

    private final SettingsService service;
    private final TransactionService transactionService;

    public SettingsLogic(SettingsService service,
                         TransactionService transactionService) {

        this.service = service;
        this.transactionService = transactionService;
    }

    // CRATE

    public Boolean initUserSettings(int userId) {
        return transactionService.execute(() -> service.setSettings(userId, "en", 1));
    }

    // READ

    public Settings getUserSettings(int userId) {
        return service.getSettings(userId);
    }

    public List<Language> getAllLanguages() {
        return service.getLanguages();
    }

    public List<Theme> getAllThemes() {
        return service.getThemes();
    }

    // EDIT

    public Boolean patchUserSettings(EditSettingsBody body) {
        return transactionService.execute(() -> service.setSettings(body.getUserId(),
                body.getLanguage().getLanguageId(),
                body.getTheme().getThemeId()));
    }

    //DELETE

    public Boolean patchUserSettingsLanguage(int userId, String languageId) {
        return transactionService.execute(() -> service.setLanguage(userId, languageId));
    }
}
