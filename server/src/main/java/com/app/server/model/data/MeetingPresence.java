package com.app.server.model.data;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@ToString
@AllArgsConstructor
public class MeetingPresence {

    @Getter
    private final int meetingId;

    @Getter
    private final int scoutId;
}
