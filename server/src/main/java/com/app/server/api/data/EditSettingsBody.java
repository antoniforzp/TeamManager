package com.app.server.api.data;

import com.app.server.model.Language;
import com.app.server.model.Theme;
import com.app.server.api.Body;
import org.codehaus.jackson.annotate.JsonProperty;

public class EditSettingsBody implements Body {

    private final int userId;
    private final Language language;
    private final Theme theme;

    public EditSettingsBody(@JsonProperty int userId,
                            @JsonProperty Language language,
                            @JsonProperty Theme theme) {
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
