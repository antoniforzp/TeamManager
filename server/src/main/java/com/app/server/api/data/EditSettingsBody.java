package com.app.server.api.data;

import com.app.server.model.Language;
import com.app.server.model.Theme;
import lombok.Getter;
import lombok.ToString;
import org.codehaus.jackson.annotate.JsonProperty;

@ToString
public class EditSettingsBody {

    @Getter
    private final int userId;

    @Getter
    private final Language language;

    @Getter
    private final Theme theme;

    public EditSettingsBody(@JsonProperty int userId,
                            @JsonProperty Language language,
                            @JsonProperty Theme theme) {
        this.userId = userId;
        this.language = language;
        this.theme = theme;
    }
}
