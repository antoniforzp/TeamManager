package com.app.server.core.logic;

import com.app.server.api.rest.body.AddMeetingBody;
import com.app.server.api.rest.body.EditMeetingBody;
import com.app.server.api.rest.body.EditPresenceBody;
import com.app.server.repository.meetingsPresenceService.MeetingsPresenceService;
import com.app.server.repository.meetingsService.MeetingsService;
import com.app.server.model.data.Meeting;
import com.app.server.model.data.MeetingPresence;
import com.app.server.model.data.Scout;
import com.app.server.core.transactions.TransactionService;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicBoolean;

@Component
public class MeetingsLogic {

    private final MeetingsService mService;
    private final MeetingsPresenceService mpService;
    private final TransactionService transactionService;

    public MeetingsLogic(MeetingsService mService,
                         MeetingsPresenceService mpService,
                         TransactionService transactionService) {

        this.mService = mService;
        this.mpService = mpService;
        this.transactionService = transactionService;
    }

    // CREATE

    public Boolean addMeeting(int teamId, AddMeetingBody body) {
        return transactionService.execute(() -> mService.add(body.getTitle(),
                body.getPlace(),
                body.getDate(),
                body.getDescription(),
                teamId));
    }

    public Boolean addMeetingPresence(int meetingId, int scoutId) {
        return transactionService.execute(() -> mpService.add(meetingId, scoutId));
    }

    // READ

    public List<Meeting> getMeetings(int teamId) {
        return mService.getAllByTeamId(teamId);
    }

    public List<MeetingPresence> getMeetingsPresence(int meetingId) {
        return mpService.getPresenceById(meetingId);
    }

    public List<MeetingPresence> getMeetingsPresenceTeam(int teamId) {
        return mpService.getPresenceByTeam(teamId);
    }

    // UPDATE

    public Boolean editMeetingPresence(int meetingId, EditPresenceBody body) {
        List<Scout> changes = body.getNewScoutsPresent();
        List<MeetingPresence> old = mpService.getPresenceById(meetingId);

        List<Integer> toAdd = new ArrayList<>();
        changes.forEach(scout -> {
            boolean check = old.stream().noneMatch(x -> x.getScoutId() == scout.getScoutId());
            if (check) {
                toAdd.add(scout.getScoutId());
            }
        });

        List<Integer> toDelete = new ArrayList<>();
        old.forEach(scout -> {
            boolean check = changes.stream().noneMatch(x -> x.getScoutId() == scout.getScoutId());
            if (check) {
                toDelete.add(scout.getScoutId());
            }
        });

        return transactionService.execute(() -> {
            AtomicBoolean check = new AtomicBoolean(true);
            toAdd.forEach(scoutId -> {
                if (!mpService.add(meetingId, scoutId)) {
                    check.set(false);
                }
            });

            toDelete.forEach(scoutId -> {
                if (!mpService.delete(meetingId, scoutId)) {
                    check.set(false);
                }
            });
            return check.get();
        });
    }

    public Boolean editMeeting(int meetingId, EditMeetingBody body) {
        return transactionService.execute(() -> mService.update(meetingId,
                body.getTitle(),
                body.getPlace(),
                body.getDate(),
                body.getDescription()));
    }

    // DELETE

    public Boolean deleteMeeting(int meetingId) {
        return transactionService.execute(() -> mService.deleteById(meetingId));
    }

    public Boolean deleteMeetingPresence(int meetingId, int scoutId) {
        return transactionService.execute(() -> mpService.delete(meetingId, scoutId));
    }
}
