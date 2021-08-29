package com.app.server.api.controllers;

import com.app.server.core.logic.SettingsLogic;
import com.app.server.model.data.Language;
import com.app.server.model.data.Settings;
import com.app.server.model.data.Theme;
import com.app.server.api.rest.response.Response;
import com.app.server.api.rest.body.EditSettingsBody;
import lombok.SneakyThrows;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
public class SettingsController {

    private final SettingsLogic logic;

    public SettingsController(SettingsLogic logic) {
        this.logic = logic;
    }

    // Transactional
    @SneakyThrows
    @PostMapping(value = "/api/{userId}/settings/init")
    public Response<Boolean> initUserSettings(@PathVariable int userId) {

        Boolean data = logic.initUserSettings(userId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @GetMapping(value = "/api/{userId}/settings")
    public Response<Settings> getUserSettings(@PathVariable int userId) {

        Settings data = logic.getUserSettings(userId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @GetMapping(value = "/api/{userId}/settings/languages")
    public Response<List<Language>> getAllLanguages(@PathVariable int userId) {

        List<Language> data = logic.getAllLanguages();

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @GetMapping(value = "/api/{userId}/settings/themes")
    public Response<List<Theme>> getAllThemes(@PathVariable int userId) {

        List<Theme> data = logic.getAllThemes();

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    // Transactional
    @SneakyThrows
    @PatchMapping(value = "/api/{userId}/settings")
    public Response<Boolean> patchUserSettings(@PathVariable int userId,
                                               @RequestBody EditSettingsBody body) {

        Boolean data = logic.patchUserSettings(body);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    // Transactional
    @SneakyThrows
    @PatchMapping(value = "/api/{userId}/settings/language/{languageId}")
    public Response<Boolean> patchUserSettingsLanguage(@PathVariable int userId,
                                                       @PathVariable String languageId) {

        Boolean data = logic.patchUserSettingsLanguage(userId, languageId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

}
