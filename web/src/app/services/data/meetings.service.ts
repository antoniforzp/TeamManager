import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Meeting, MeetingPresence } from 'src/app/model/Meeting';
import { REST, RestService } from 'src/app/web/rest.service';

export interface MeetingPayload {
  title: string;
  place: string;
  date: Date;
}

@Injectable({
  providedIn: 'root',
})
export class MeetingsService {
  constructor(private rest: RestService) {}

  addMeeting(meeting: MeetingPayload): Observable<boolean> {
    return this.rest.resolve<boolean>({
      method: REST.POST,
      url: `/meetings`,
      body: meeting,
    });
  }

  addMeetingPresence(meetingId: number, scoutId: number): Observable<boolean> {
    return this.rest.resolve<boolean>({
      method: REST.POST,
      url: `/meetings${meetingId}/scouts${scoutId}`,
    });
  }

  getMeetings(): Observable<Meeting[]> {
    return this.rest.resolve<Meeting[]>({
      method: REST.GET,
      url: `/meetings`,
    });
  }

  getMeetingsPresence(): Observable<MeetingPresence[]> {
    return this.rest.resolve<MeetingPresence[]>({
      method: REST.GET,
      url: `/meetings/presence`,
    });
  }

  getMeetingsPresenceById(meetingId: number): Observable<MeetingPresence[]> {
    return this.rest.resolve<MeetingPresence[]>({
      method: REST.GET,
      url: `/meetings${meetingId}/presence`,
    });
  }

  patchMeeting(
    meetingId: number,
    meeting: MeetingPayload
  ): Observable<boolean> {
    return this.rest.resolve<boolean>({
      method: REST.PATCH,
      url: `/meetings${meetingId}`,
      body: meeting,
    });
  }

  deleteMeeting(meetingId: number): Observable<boolean> {
    return this.rest.resolve<boolean>({
      method: REST.DELETE,
      url: `/meetings${meetingId}`,
    });
  }

  deleteMeetingPresence(meetingId: number, scoutId: number): Observable<boolean> {
    return this.rest.resolve<boolean>({
      method: REST.DELETE,
      url: `/meetings${meetingId}/scouts${scoutId}`,
    });
  }
}