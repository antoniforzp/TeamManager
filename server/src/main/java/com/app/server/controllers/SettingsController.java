package com.app.server.controllers;

import com.app.server.database.settingsService.SettingsService;
import com.app.server.model.Language;
import com.app.server.model.Settings;
import com.app.server.model.Theme;
import com.app.server.api.Response;
import com.app.server.api.data.EditSettingsBody;
import lombok.SneakyThrows;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@CrossOrigin
@RestController
public class SettingsController {

    private final SettingsService service;

    public SettingsController(SettingsService service) {
        this.service = service;
    }

    @SneakyThrows
    @PostMapping(value = "/api/{userId}/settings/init")
    public Response<Boolean> initUserSettings(@PathVariable int userId) {

        CompletableFuture<Boolean> data = service.setSettings(userId, 1, 1);
        CompletableFuture.allOf(data).join();

        return new Response<>(
                data.get(),
                userId,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @GetMapping(value = "/api/{userId}/settings")
    public Response<Settings> getUserSettings(@PathVariable int userId) {

        CompletableFuture<Settings> data = service.getSettings(userId);
        CompletableFuture.allOf(data).join();

        return new Response<>(
                data.get(),
                userId,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @GetMapping(value = "/api/{userId}/settings/languages")
    public Response<List<Language>> getAllLanguages(@PathVariable int userId) {

        CompletableFuture<List<Language>> data = service.getLanguages();
        CompletableFuture.allOf(data).join();

        return new Response<>(
                data.get(),
                userId,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @GetMapping(value = "/api/{userId}/settings/themes")
    public Response<List<Theme>> getAllThemes(@PathVariable int userId) {

        CompletableFuture<List<Theme>> data = service.getThemes();
        CompletableFuture.allOf(data).join();

        return new Response<>(
                data.get(),
                userId,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @PatchMapping(value = "/api/{userId}/settings")
    public Response<Boolean> patchUserSettings(@PathVariable int userId,
                                               @RequestBody EditSettingsBody body) {

        CompletableFuture<Boolean> data = service.setSettings(body.getUserId(),
                body.getLanguage().getLanguageId(),
                body.getTheme().getThemeId());
        CompletableFuture.allOf(data).join();

        return new Response<>(
                data.get(),
                userId,
                HttpStatus.ACCEPTED);
    }

}
