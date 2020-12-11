package com.app.logic.controllers;

import com.app.logic.core.AppCore;
import com.app.logic.database.scouts.ScoutsRepository;
import com.app.logic.model.Scout;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/scouts")
public class ScoutsController {

    private final ScoutsRepository repository;
    private final AppCore appCore;

    public ScoutsController(ScoutsRepository repository, AppCore appCore) {
        this.repository = repository;
        this.appCore = appCore;
    }

    @GetMapping("/list")
    public List<Scout> getScoutsList() {
        return repository.getAllByTeamId(appCore.getCurrentTeam().getTeamId());
    }

    @PostMapping("/add")
    public boolean addScout(@RequestParam("name") String name,
                            @RequestParam("surname") String surname,
                            @RequestParam("pesel") String pesel,
                            @RequestParam("birthDate") Date birthDate,
                            @RequestParam("address") String address,
                            @RequestParam("postalCode") String postalCode,
                            @RequestParam("city") String city,
                            @RequestParam("phone") String phone,
                            @RequestParam("troopId") int troopId,
                            @RequestParam("rankId") int rankId,
                            @RequestParam("instructorRankId") int instructorRankId) {

        return repository.add(name,
                surname,
                pesel,
                birthDate,
                address,
                postalCode,
                city,
                phone,
                troopId,
                rankId,
                instructorRankId,
                appCore.getCurrentTeam().getTeamId());
    }

    @PostMapping("/update")
    public boolean updateScout(@RequestParam("scoutId") int scoutId,
                               @RequestParam("name") String name,
                               @RequestParam("surname") String surname,
                               @RequestParam("pesel") String pesel,
                               @RequestParam("birthDate") Date birthDate,
                               @RequestParam("address") String address,
                               @RequestParam("postalCode") String postalCode,
                               @RequestParam("city") String city,
                               @RequestParam("phone") String phone,
                               @RequestParam("troopId") int troopId,
                               @RequestParam("rankId") int rankId,
                               @RequestParam("instructorRankId") int instructorRankId) {

        return repository.update(scoutId,
                name,
                surname,
                pesel,
                birthDate,
                address,
                postalCode,
                city,
                phone,
                troopId,
                rankId,
                instructorRankId);
    }
}
