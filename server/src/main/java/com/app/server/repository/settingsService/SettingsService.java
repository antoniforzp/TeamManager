package com.app.server.repository.settingsService;

import com.app.server.model.data.Language;
import com.app.server.model.data.Settings;
import com.app.server.model.data.Theme;

import java.util.List;

public interface SettingsService {

    Settings getSettings(int userId);

    Boolean addSettings(int userId, String languageId, int themeId);

    Boolean setSettings(int userId, String languageId, int themeId);

    Boolean setLanguage(int userId, String languageId);

    List<Language> getLanguages();

    List<Theme> getThemes();
}
