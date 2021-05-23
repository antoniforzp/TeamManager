import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Journey, JourneyPresence } from 'src/app/model/Journey';
import { RestService, REST } from 'src/app/web/rest.service';
import { AppStateService } from '../core/app-state.service';

export interface JourneyPayload {
  title: string;
  place: string;
  date: Date;
  endDate: Date;
}

@Injectable({
  providedIn: 'root',
})
export class JourneysService {
  constructor(private rest: RestService, private app: AppStateService) {}

  addJourney(journey: JourneyPayload): Observable<boolean> {
    return this.rest.resolve<boolean>({
      method: REST.POST,
      url: `/api/${this.app.userId}/team/${this.app.userId}/journeys`,
      body: journey,
    });
  }

  addJourneyPresence(journeyId: number, scoutId: number): Observable<boolean> {
    return this.rest.resolve<boolean>({
      method: REST.POST,
      url: `/api/${this.app.userId}/journeys/${journeyId}/scouts/${scoutId}`,
    });
  }

  getJourneys(): Observable<Journey[]> {
    return this.rest.resolve<Journey[]>({
      method: REST.GET,
      url: `/api/${this.app.userId}/team/${this.app.teamId}/journeys`,
    });
  }

  getJourneysPresence(): Observable<JourneyPresence[]> {
    return this.rest.resolve<JourneyPresence[]>({
      method: REST.GET,
      url: `/api/${this.app.userId}/team/${this.app.teamId}/journeys/presence`,
    });
  }

  getJourneysPresenceById(journeyId: number): Observable<JourneyPresence[]> {
    return this.rest.resolve<JourneyPresence[]>({
      method: REST.GET,
      url: `/api/${this.app.userId}/journeys/${journeyId}/presence`,
    });
  }

  patchJourney(
    journeyId: number,
    journey: JourneyPayload
  ): Observable<boolean> {
    return this.rest.resolve<boolean>({
      method: REST.PATCH,
      url: `/api/${this.app.userId}/journeys/${journeyId}`,
      body: journey,
    });
  }

  deleteJourney(journeyId: number): Observable<boolean> {
    return this.rest.resolve<boolean>({
      method: REST.DELETE,
      url: `/api/${this.app.userId}/journeys/${journeyId}`,
    });
  }

  deleteJourneyPresence(
    journeyId: number,
    scoutId: number
  ): Observable<boolean> {
    return this.rest.resolve<boolean>({
      method: REST.DELETE,
      url: `/api/${this.app.userId}/journeys/${journeyId}/scouts${scoutId}`,
    });
  }
}
