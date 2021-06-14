package com.app.server.controllers;

import com.app.server.database.settingsService.SettingsService;
import com.app.server.model.Language;
import com.app.server.model.Settings;
import com.app.server.model.Theme;
import com.app.server.api.Response;
import com.app.server.api.data.EditSettingsBody;
import com.app.server.transactions.TransactionService;
import lombok.SneakyThrows;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@CrossOrigin
@RestController
public class SettingsController {

    private final SettingsService service;
    private final TransactionService transactionService;

    public SettingsController(SettingsService service,
                              TransactionService transactionService) {

        this.service = service;
        this.transactionService = transactionService;
    }

    // Transactional
    @SneakyThrows
    @PostMapping(value = "/api/{userId}/settings/init")
    public Response<Boolean> initUserSettings(@PathVariable int userId) {

        Boolean data = transactionService.execute(() -> service.setSettings(userId, "en", 1));

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @GetMapping(value = "/api/{userId}/settings")
    public Response<Settings> getUserSettings(@PathVariable int userId) {

        Settings data = service.getSettings(userId);

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @GetMapping(value = "/api/{userId}/settings/languages")
    public Response<List<Language>> getAllLanguages(@PathVariable int userId) {

        List<Language> data = service.getLanguages();

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

    @SneakyThrows
    @GetMapping(value = "/api/{userId}/settings/themes")
    public Response<List<Theme>> getAllThemes(@PathVariable int userId) {

        List<Theme> data = service.getThemes();

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

        Boolean data = transactionService.execute(() -> service.setSettings(body.getUserId(),
                body.getLanguage().getLanguageId(),
                body.getTheme().getThemeId()));

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

        Boolean data = transactionService.execute(() -> service.setLanguage(userId, languageId));

        return new Response<>(
                data,
                userId,
                HttpStatus.ACCEPTED);
    }

}
