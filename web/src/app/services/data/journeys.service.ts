import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Journey, JourneyPresence } from 'src/app/model/data/Journey';
import { Scout } from 'src/app/model/data/Scout';
import { RestService, REST } from 'src/app/web/rest.service';
import { AppStateService } from '../core/app-state.service';

export interface JourneyPayload {
  title: string;
  place: string;
  date: Date;
  endDate: Date;
  description: string;
}

export interface JourneyPresencePayload {
  newScoutsPresent: Scout[];
}

@Injectable({
  providedIn: 'root',
})
export class JourneysService {
  constructor(private rest: RestService, private app: AppStateService) {}

  public addJourney(journey: JourneyPayload): Observable<boolean> {
    try {
      return this.rest.resolve<boolean>({
        method: REST.POST,
        url: `/api/${this.app.userId}/team/${this.app.teamId}/journeys`,
        body: journey,
      });
    } catch (error) {
      return throwError(error);
    }
  }

  public addJourneyPresence(
    journeyId: number,
    scoutId: number
  ): Observable<boolean> {
    try {
      return this.rest.resolve<boolean>({
        method: REST.POST,
        url: `/api/${this.app.userId}/journeys/${journeyId}/scouts/${scoutId}`,
      });
    } catch (error) {
      return throwError(error);
    }
  }

  public getJourneys(): Observable<Journey[]> {
    try {
      return this.rest.resolve<Journey[]>({
        method: REST.GET,
        url: `/api/${this.app.userId}/team/${this.app.teamId}/journeys`,
      });
    } catch (error) {
      return throwError(error);
    }
  }

  public getJourneysPresence(): Observable<JourneyPresence[]> {
    try {
      return this.rest.resolve<JourneyPresence[]>({
        method: REST.GET,
        url: `/api/${this.app.userId}/team/${this.app.teamId}/journeys/presence`,
      });
    } catch (error) {
      return throwError(error);
    }
  }

  public getJourneysPresenceById(
    journeyId: number
  ): Observable<JourneyPresence[]> {
    try {
      return this.rest.resolve<JourneyPresence[]>({
        method: REST.GET,
        url: `/api/${this.app.userId}/journeys/${journeyId}/presence`,
      });
    } catch (error) {
      return throwError(error);
    }
  }

  public patchJourney(
    journeyId: number,
    journey: JourneyPayload
  ): Observable<boolean> {
    try {
      return this.rest.resolve<boolean>({
        method: REST.PATCH,
        url: `/api/${this.app.userId}/journeys/${journeyId}`,
        body: journey,
      });
    } catch (error) {
      return throwError(error);
    }
  }

  public patchJourneyPresence(
    journeyId: number,
    scouts: Scout[]
  ): Observable<boolean> {
    const body = { newScoutsPresent: scouts } as JourneyPresencePayload;
    try {
      return this.rest.resolve<boolean>({
        method: REST.PATCH,
        url: `/api/${this.app.userId}/journeys/${journeyId}/presence`,
        body,
      });
    } catch (error) {
      return throwError(error);
    }
  }

  public deleteJourney(journeyId: number): Observable<boolean> {
    try {
      return this.rest.resolve<boolean>({
        method: REST.DELETE,
        url: `/api/${this.app.userId}/journeys/${journeyId}`,
      });
    } catch (error) {
      return throwError(error);
    }
  }

  public deleteJourneyPresence(
    journeyId: number,
    scoutId: number
  ): Observable<boolean> {
    try {
      return this.rest.resolve<boolean>({
        method: REST.DELETE,
        url: `/api/${this.app.userId}/journeys/${journeyId}/scouts${scoutId}`,
      });
    } catch (error) {
      return throwError(error);
    }
  }
}
