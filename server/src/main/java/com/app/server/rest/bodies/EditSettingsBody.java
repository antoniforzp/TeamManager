package com.app.server.rest.bodies;

import com.app.server.model.Language;
import com.app.server.model.Theme;
import com.app.server.rest.Body;
import org.codehaus.jackson.annotate.JsonProperty;

public class EditSettingsBody implements Body {

    private final int userId;
    private final Language language;
    private final Theme theme;

    public EditSettingsBody(int userId, @JsonProperty Language language, Theme theme) {
        this.userId = userId;
        this.language = language;
        this.theme = theme;
    }

    public int getUserId() {
        return userId;
    }

    public Language getLanguage() {
        return language;
    }

    public Theme getTheme() {
        return theme;
    }
}
