import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Team } from 'src/app/model/data/Team';
import { User } from 'src/app/model/data/User';
import { REST, RestService } from '../../web/rest.service';
import { AppStateService } from '../core/app-state.service';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  constructor(private rest: RestService, private app: AppStateService) {}

  public getCurrentUser(): Observable<User> {
    try {
      return this.rest.resolve<User>({
        method: REST.GET,
        url: `/api/${this.app.userId}/users`,
      });
    } catch (error) {
      return throwError(error);
    }
  }

  public getCurrentTeam(): Observable<Team> {
    try {
      return this.rest.resolve<Team>({
        method: REST.GET,
        url: `/api/${this.app.userId}/teams/${this.app.teamId}`,
      });
    } catch (error) {
      return throwError(error);
    }
  }

  public getCurrentUserTeams(): Observable<Team[]> {
    try {
      return this.rest.resolve<Team[]>({
        method: REST.GET,
        url: `/api/${this.app.userId}/teams`,
      });
    } catch (error) {
      return throwError(error);
    }
  }

  public setCurrentTeam(teamId: number): Observable<boolean> {
    try {
      this.app.storeCurrentTeamId(teamId);
      return of(true);
    } catch (error) {
      return throwError(error);
    }
  }
}
