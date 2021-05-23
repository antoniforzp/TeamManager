import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Team } from 'src/app/model/Team';
import { User } from 'src/app/model/User';
import { REST, RestService } from '../../web/rest.service';
import { AppStateService } from '../core/app-state.service';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  constructor(private rest: RestService, private app: AppStateService) {}

  getCurrentUser(): Observable<User> {
    return this.rest.resolve<User>({
      method: REST.GET,
      url: `/api/${this.app.userId}/users`,
    });
  }

  getCurrentTeam(): Observable<Team> {
    return this.rest.resolve<Team>({
      method: REST.GET,
      url: `/api/${this.app.userId}/teams/${this.app.teamId}`,
    });
  }

  getCurrentUserTeams(): Observable<Team[]> {
    return this.rest.resolve<Team[]>({
      method: REST.GET,
      url: `/api/${this.app.userId}/teams`,
    });
  }

  setCurrentTeam(teamId: number): Observable<boolean> {
    this.app.storeCurrentTeamId(teamId);
    return of(true);
  }
}
