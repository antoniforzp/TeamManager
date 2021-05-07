package com.app.server.database.settings;

import com.app.server.model.Language;
import com.app.server.model.Settings;

import java.util.List;

public interface SettingsRepository {

    Settings getSettings(int userId);

    boolean setSettings(int userId, int languageId);

    List<Language> getLanguages();
}
