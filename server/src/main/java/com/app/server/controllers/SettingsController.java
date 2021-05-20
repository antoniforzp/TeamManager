package com.app.server.controllers;

import com.app.server.core.AppCore;
import com.app.server.database.settings.SettingsRepository;
import com.app.server.model.Language;
import com.app.server.model.Settings;
import com.app.server.model.Theme;
import com.app.server.api.Response;
import com.app.server.api.data.EditSettingsBody;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class SettingsController {

    private final SettingsRepository repository;

    public SettingsController(SettingsRepository repository) {
        this.repository = repository;
    }

    @CrossOrigin
    @GetMapping(value = "/api/{userId}/settings")
    public Response<Settings> getUserSettings(@PathVariable int userId) {
        Settings data = repository.getSettings(userId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @GetMapping(value = "/api/{userId}/settings/languages")
    public Response<List<Language>> getAllLanguages(@PathVariable int userId) {
        List<Language> data = repository.getLanguages();

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @GetMapping(value = "/api/{userId}/settings/themes")
    public Response<List<Theme>> getAllThemes(@PathVariable int userId) {
        List<Theme> data = repository.getThemes();

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @PatchMapping(value = "/api/{userId}/settings")
    public Response<Boolean> patchUserSettings(@PathVariable int userId,
                                               @RequestBody EditSettingsBody body) {
        Boolean data = repository.setSettings(body.getUserId(),
                body.getLanguage().getLanguageId(),
                body.getTheme().getThemeId());

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

}
