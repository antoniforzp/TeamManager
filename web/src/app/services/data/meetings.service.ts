import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Meeting, MeetingPresence } from 'src/app/model/data/Meeting';
import { Scout } from 'src/app/model/data/Scout';
import { REST, RestService } from 'src/app/web/rest.service';
import { AppStateService } from '../core/app-state.service';

export interface MeetingPayload {
  title: string;
  place: string;
  date: Date;
  description: string;
}

export interface MeetingPresencePayload {
  newScoutsPresent: Scout[];
}

@Injectable({
  providedIn: 'root',
})
export class MeetingsService {
  constructor(private rest: RestService, private app: AppStateService) {}

  public addMeeting(meeting: MeetingPayload): Observable<boolean> {
    try {
      return this.rest.resolve<boolean>({
        method: REST.POST,
        url: `/api/${this.app.userId}/team/${this.app.teamId}/meetings`,
        body: meeting,
      });
    } catch (error) {
      return throwError(error);
    }
  }

  public addMeetingPresence(
    meetingId: number,
    scoutId: number
  ): Observable<boolean> {
    try {
      return this.rest.resolve<boolean>({
        method: REST.POST,
        url: `/api/${this.app.userId}/meetings/${meetingId}/scouts/${scoutId}`,
      });
    } catch (error) {
      return throwError(error);
    }
  }

  public getMeetings(): Observable<Meeting[]> {
    try {
      return this.rest.resolve<Meeting[]>({
        method: REST.GET,
        url: `/api/${this.app.userId}/team/${this.app.teamId}/meetings`,
      });
    } catch (error) {
      return throwError(error);
    }
  }

  public getMeetingsPresence(): Observable<MeetingPresence[]> {
    try {
      return this.rest.resolve<MeetingPresence[]>({
        method: REST.GET,
        url: `/api/${this.app.userId}/team/${this.app.teamId}/meetings/presence`,
      });
    } catch (error) {
      return throwError(error);
    }
  }

  public getMeetingsPresenceById(
    meetingId: number
  ): Observable<MeetingPresence[]> {
    try {
      return this.rest.resolve<MeetingPresence[]>({
        method: REST.GET,
        url: `/api/${this.app.userId}/meetings/${meetingId}/presence`,
      });
    } catch (error) {
      return throwError(error);
    }
  }

  public patchMeeting(
    meetingId: number,
    meeting: MeetingPayload
  ): Observable<boolean> {
    try {
      return this.rest.resolve<boolean>({
        method: REST.PATCH,
        url: `/api/${this.app.userId}/meetings/${meetingId}`,
        body: meeting,
      });
    } catch (error) {
      return throwError(error);
    }
  }

  public patchMeetingPresence(
    meetingId: number,
    scouts: Scout[]
  ): Observable<boolean> {
    const body = { newScoutsPresent: scouts } as MeetingPresencePayload;
    try {
      return this.rest.resolve<boolean>({
        method: REST.PATCH,
        url: `/api/${this.app.userId}/meetings/${meetingId}/presence`,
        body,
      });
    } catch (error) {
      return throwError(error);
    }
  }

  public deleteMeeting(meetingId: number): Observable<boolean> {
    try {
      return this.rest.resolve<boolean>({
        method: REST.DELETE,
        url: `/api/${this.app.userId}/meetings/${meetingId}`,
      });
    } catch (error) {
      return throwError(error);
    }
  }

  public deleteMeetingPresence(
    meetingId: number,
    scoutId: number
  ): Observable<boolean> {
    try {
      return this.rest.resolve<boolean>({
        method: REST.DELETE,
        url: `/api/${this.app.userId}/meetings/${meetingId}/scouts/${scoutId}`,
      });
    } catch (error) {
      return throwError(error);
    }
  }
}
