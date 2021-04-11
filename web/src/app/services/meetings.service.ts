import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Meeting } from '../model/Meeting';
import { REST, RestService } from '../web/rest.service';

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

  getMeetings(): Observable<Meeting[]> {
    return this.rest.resolve<Meeting[]>({
      method: REST.GET,
      url: `/meetings`,
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
}
