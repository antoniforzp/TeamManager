package com.app.server.controllers;

import com.app.server.core.AppCore;
import com.app.server.database.instructorRanks.InstructorRanksRepository;
import com.app.server.database.settings.SettingsRepository;
import com.app.server.model.InstructorRank;
import com.app.server.model.Language;
import com.app.server.model.Settings;
import com.app.server.rest.Response;
import com.app.server.rest.bodies.AddJourneyBody;
import com.app.server.rest.bodies.EditSettingsBody;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class SettingsController {

    private final AppCore appCore;
    private final SettingsRepository repository;

    public SettingsController(AppCore appCore, SettingsRepository repository) {
        this.appCore = appCore;
        this.repository = repository;
    }

    @CrossOrigin
    @GetMapping(value = "/settings")
    public ResponseEntity<Response<Settings>> getUserSettings() {
        appCore.checkCoreInit();
        return new ResponseEntity<>(new Response<>(
                repository.getSettings(appCore.getCurrentUser().getUserId()),
                appCore.getCurrentUser().getUserId()),
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @GetMapping(value = "/settings/languages")
    public ResponseEntity<Response<List<Language>>> getAllLanguages() {
        appCore.checkCoreInit();
        return new ResponseEntity<>(new Response<>(
                repository.getLanguages(),
                appCore.getCurrentUser().getUserId()),
                HttpStatus.ACCEPTED);
    }

    @CrossOrigin
    @PatchMapping(value = "/settings")
    public ResponseEntity<Response<Boolean>> patchUserSettings(@RequestBody EditSettingsBody body) {
        appCore.checkCoreInit();
        return new ResponseEntity<>(new Response<>(
                repository.setSettings(body.getUserId(),
                        body.getLanguage().getLanguageId()),
                appCore.getCurrentUser().getUserId()),
                HttpStatus.ACCEPTED);
    }

}
