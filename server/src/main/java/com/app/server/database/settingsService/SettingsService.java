package com.app.server.database.settingsService;

import com.app.server.model.Language;
import com.app.server.model.Settings;
import com.app.server.model.Theme;

import java.util.List;
import java.util.concurrent.CompletableFuture;

public interface SettingsService {

    CompletableFuture<Settings> getSettings(int userId);

    CompletableFuture<Boolean> setSettings(int userId, String languageId, int themeId);

    CompletableFuture<Boolean> setLanguage(int userId, String langAbbreviation);

    CompletableFuture<List<Language>> getLanguages();

    CompletableFuture<List<Theme>> getThemes();
}
