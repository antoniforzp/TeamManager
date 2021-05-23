import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patrol } from 'src/app/model/Patrol';
import { RestService, REST } from 'src/app/web/rest.service';
import { AppSettingsService } from '../core/app-settings.service';
import { AppStateService } from '../core/app-state.service';

@Injectable({
  providedIn: 'root',
})
export class PatrolsService {
  constructor(private rest: RestService, private app: AppStateService) {}

  getPatrols(): Observable<Patrol[]> {
    return this.rest.resolve<Patrol[]>({
      method: REST.GET,
      url: `/api/${this.app.userId}/team/${this.app.teamId}/patrols`,
    });
  }

  addPatrol(name: string): Observable<boolean> {
    return this.rest.resolve<boolean>({
      method: REST.POST,
      url: `/api/${this.app.userId}/team/${this.app.teamId}/patrols`,
      body: {
        name,
      },
    });
  }

  patchPatrols(patrolId: number, name: string): Observable<boolean> {
    return this.rest.resolve<boolean>({
      method: REST.PATCH,
      url: `/api/${this.app.userId}/patrols/${patrolId}`,
      body: {
        name,
      },
    });
  }

  deletePatrol(patrolId: number): Observable<boolean> {
    return this.rest.resolve<boolean>({
      method: REST.DELETE,
      url: `/api/${this.app.userId}/patrols/${patrolId}`,
    });
  }
}
