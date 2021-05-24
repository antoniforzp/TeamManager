import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Meeting, MeetingPresence } from 'src/app/model/Meeting';
import { REST, RestService } from 'src/app/web/rest.service';
import { AppStateService } from '../core/app-state.service';

export interface MeetingPayload {
  title: string;
  place: string;
  date: Date;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class MeetingsService {
  constructor(private rest: RestService, private app: AppStateService) {}

  addMeeting(meeting: MeetingPayload): Observable<boolean> {
    return this.rest.resolve<boolean>({
      method: REST.POST,
      url: `/api/${this.app.userId}/team/${this.app.teamId}/meetings`,
      body: meeting,
    });
  }

  addMeetingPresence(meetingId: number, scoutId: number): Observable<boolean> {
    return this.rest.resolve<boolean>({
      method: REST.POST,
      url: `/api/${this.app.userId}/meetings/${meetingId}/scouts/${scoutId}`,
    });
  }

  getMeetings(): Observable<Meeting[]> {
    return this.rest.resolve<Meeting[]>({
      method: REST.GET,
      url: `/api/${this.app.userId}/team/${this.app.teamId}/meetings`,
    });
  }

  getMeetingsPresence(): Observable<MeetingPresence[]> {
    return this.rest.resolve<MeetingPresence[]>({
      method: REST.GET,
      url: `/api/${this.app.userId}/team/${this.app.teamId}/meetings/presence`,
    });
  }

  getMeetingsPresenceById(meetingId: number): Observable<MeetingPresence[]> {
    return this.rest.resolve<MeetingPresence[]>({
      method: REST.GET,
      url: `/api/${this.app.userId}/meetings/${meetingId}/presence`,
    });
  }

  patchMeeting(
    meetingId: number,
    meeting: MeetingPayload
  ): Observable<boolean> {
    return this.rest.resolve<boolean>({
      method: REST.PATCH,
      url: `/api/${this.app.userId}/meetings/${meetingId}`,
      body: meeting,
    });
  }

  deleteMeeting(meetingId: number): Observable<boolean> {
    return this.rest.resolve<boolean>({
      method: REST.DELETE,
      url: `/api/${this.app.userId}/meetings/${meetingId}`,
    });
  }

  deleteMeetingPresence(
    meetingId: number,
    scoutId: number
  ): Observable<boolean> {
    return this.rest.resolve<boolean>({
      method: REST.DELETE,
      url: `/api/${this.app.userId}/meetings/${meetingId}/scouts/${scoutId}`,
    });
  }
}
