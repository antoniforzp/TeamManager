import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Patrol } from 'src/app/model/data/Patrol';
import { RestService, REST } from 'src/app/web/rest.service';
import { AppStateService } from '../core/app-state.service';

@Injectable({
  providedIn: 'root',
})
export class PatrolsService {
  constructor(private rest: RestService, private app: AppStateService) {}

  public getPatrols(): Observable<Patrol[]> {
    try {
      return this.rest.resolve<Patrol[]>({
        method: REST.GET,
        url: `/api/${this.app.userId}/team/${this.app.teamId}/patrols`,
      });
    } catch (error) {
      return throwError(error);
    }
  }

  public addPatrol(name: string): Observable<boolean> {
    try {
      return this.rest.resolve<boolean>({
        method: REST.POST,
        url: `/api/${this.app.userId}/team/${this.app.teamId}/patrols`,
        body: {
          name,
        },
      });
    } catch (error) {
      return throwError(error);
    }
  }

  public patchPatrols(patrolId: number, name: string): Observable<boolean> {
    try {
      return this.rest.resolve<boolean>({
        method: REST.PATCH,
        url: `/api/${this.app.userId}/patrols/${patrolId}`,
        body: {
          name,
        },
      });
    } catch (error) {
      return throwError(error);
    }
  }

  public deletePatrol(patrolId: number): Observable<boolean> {
    try {
      return this.rest.resolve<boolean>({
        method: REST.DELETE,
        url: `/api/${this.app.userId}/patrols/${patrolId}`,
      });
    } catch (error) {
      return throwError(error);
    }
  }
}
