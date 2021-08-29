package com.app.server.core.logic;

import com.app.server.repository.rolesService.RolesService;
import com.app.server.model.data.Role;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class RolesLogic {

    private final RolesService service;

    public RolesLogic(RolesService service) {
        this.service = service;
    }

    // READ

    public List<Role> getRoles() {
        return service.getAll();
    }
}
