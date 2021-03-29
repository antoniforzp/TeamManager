import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from 'src/app/model/Team';
import { REST, RestService } from '../web/rest.service';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  constructor(private rest: RestService) {}

  addTeam(name: string, patron: string): Observable<any> {
    return this.rest.resolve<boolean>({
      method: REST.POST,
      url: `/teams`,
      body: {
        name,
        patron,
      },
    });
  }

  getUserTeams(): Observable<Team[]> {
    return this.rest.resolve<Team[]>({
      method: REST.GET,
      url: `/teams`,
    });
  }

  patchTeam(teamId: number, name: string, patron: string): Observable<any> {
    return this.rest.resolve<boolean>({
      method: REST.POST,
      url: `/teams${teamId}`,
      body: {
        name,
        patron,
      },
    });
  }

  deleteTeam(teamId: number): Observable<any> {
    return this.rest.resolve<boolean>({
      method: REST.DELETE,
      url: `/teams${teamId}`,
    });
  }
}
