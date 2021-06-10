package com.app.server.database.settingsService;

import com.app.server.model.Language;
import com.app.server.model.Settings;
import com.app.server.model.Theme;

import java.util.List;
import java.util.concurrent.CompletableFuture;

public interface SettingsService {

    Settings getSettings(int userId);

    Boolean setSettings(int userId, String languageId, int themeId);

    Boolean setLanguage(int userId, String languageId);

    List<Language> getLanguages();

    List<Theme> getThemes();
}
