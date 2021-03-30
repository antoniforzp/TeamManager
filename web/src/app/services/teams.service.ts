import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Team } from 'src/app/model/Team';
import { REST, RestService } from '../web/rest.service';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  constructor(private rest: RestService, private errors: ErrorService) {}

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
      method: REST.PATCH,
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
