import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from 'src/app/model/Team';
import { User } from 'src/app/model/User';
import { REST, RestService } from '../web/rest.service';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  constructor(private rest: RestService) {}

  getCurrentUser(): Observable<User> {
    return this.rest.resolve<User>({
      method: REST.GET,
      url: `/core/user`,
    });
  }

  getCurrentTeam(): Observable<Team> {
    return this.rest.resolve<Team>({
      method: REST.GET,
      url: `/core/team`,
    });
  }

  getCurrentUserTeams(): Observable<Team[]> {
    return this.rest.resolve<Team[]>({
      method: REST.GET,
      url: `/teams`,
    });
  }

  setCurrentTeam(teamId: number): Observable<boolean> {
    return this.rest.resolve<boolean>({
      method: REST.POST,
      url: `/core/team${teamId}`,
    });
  }
}
