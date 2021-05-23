import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Team } from 'src/app/model/Team';
import { RestService, REST } from 'src/app/web/rest.service';
import { AppStateService } from '../core/app-state.service';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  constructor(private rest: RestService, private app: AppStateService) {}

  addTeam(name: string, patron: string): Observable<any> {
    return this.rest.resolve<boolean>({
      method: REST.POST,
      url: `/api/${this.app.userId}/teams`,
      body: {
        name,
        patron,
      },
    });
  }

  getUserTeams(): Observable<Team[]> {
    return this.rest.resolve<Team[]>({
      method: REST.GET,
      url: `/api/${this.app.userId}/teams`,
    });
  }

  getCurrentUserTeamsNo(): Observable<number> {
    return this.rest
      .resolve<Team[]>({
        method: REST.GET,
        url: `/api/${this.app.userId}/teams`,
      })
      .pipe(map((x) => x.length));
  }

  patchTeam(teamId: number, name: string, patron: string): Observable<any> {
    return this.rest.resolve<boolean>({
      method: REST.PATCH,
      url: `/api/${this.app.userId}/teams/${teamId}`,
      body: {
        name,
        patron,
      },
    });
  }

  deleteTeam(teamId: number): Observable<any> {
    return this.rest.resolve<boolean>({
      method: REST.DELETE,
      url: `/api/${this.app.userId}/teams/${teamId}`,
    });
  }
}
