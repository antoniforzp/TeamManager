import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Journey, JourneyPresence } from '../model/Journey';
import { Meeting, MeetingPresence } from '../model/Meeting';
import { REST, RestService } from '../web/rest.service';

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
  constructor(private rest: RestService) {}

  addJourney(journey: JourneyPayload): Observable<boolean> {
    return this.rest.resolve<boolean>({
      method: REST.POST,
      url: `/journey`,
      body: journey,
    });
  }

  addJourneyPresence(journeyId: number, scoutId: number): Observable<boolean> {
    return this.rest.resolve<boolean>({
      method: REST.POST,
      url: `/journeys${journeyId}/scouts${scoutId}`,
    });
  }

  getJourneys(): Observable<Journey[]> {
    return this.rest.resolve<Journey[]>({
      method: REST.GET,
      url: `/journeys`,
    });
  }

  getJourneysPresence(): Observable<JourneyPresence[]> {
    return this.rest.resolve<JourneyPresence[]>({
      method: REST.GET,
      url: `/journeys/presence`,
    });
  }

  getJourneysPresenceById(journeyId: number): Observable<JourneyPresence[]> {
    return this.rest.resolve<JourneyPresence[]>({
      method: REST.GET,
      url: `/journeys${journeyId}/presence`,
    });
  }

  patchJourney(
    journeyId: number,
    journey: JourneyPayload
  ): Observable<boolean> {
    return this.rest.resolve<boolean>({
      method: REST.PATCH,
      url: `/journeys${journeyId}`,
      body: journey,
    });
  }

  deleteJourney(journeyId: number): Observable<boolean> {
    return this.rest.resolve<boolean>({
      method: REST.DELETE,
      url: `/journeys${journeyId}`,
    });
  }

  deleteJourneyPresence(
    journeyId: number,
    scoutId: number
  ): Observable<boolean> {
    return this.rest.resolve<boolean>({
      method: REST.DELETE,
      url: `/journeys${journeyId}/scouts${scoutId}`,
    });
  }
}
