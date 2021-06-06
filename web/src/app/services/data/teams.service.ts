import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Team } from 'src/app/model/data/Team';
import { RestService, REST } from 'src/app/web/rest.service';
import { AppStateService } from '../core/app-state.service';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  constructor(private rest: RestService, private app: AppStateService) {}

  public addTeam(name: string, patron: string): Observable<any> {
    try {
      return this.rest.resolve<boolean>({
        method: REST.POST,
        url: `/api/${this.app.userId}/teams`,
        body: {
          name,
          patron,
        },
      });
    } catch (error) {
      return throwError(error);
    }
  }

  public getUserTeams(): Observable<Team[]> {
    try {
      return this.rest.resolve<Team[]>({
        method: REST.GET,
        url: `/api/${this.app.userId}/teams`,
      });
    } catch (error) {
      return throwError(error);
    }
  }

  public getCurrentUserTeamsNo(): Observable<number> {
    try {
      return this.rest
        .resolve<Team[]>({
          method: REST.GET,
          url: `/api/${this.app.userId}/teams`,
        })
        .pipe(map((x) => x.length));
    } catch (error) {
      return throwError(error);
    }
  }

  public patchTeam(
    teamId: number,
    name: string,
    patron: string
  ): Observable<any> {
    try {
      return this.rest.resolve<boolean>({
        method: REST.PATCH,
        url: `/api/${this.app.userId}/teams/${teamId}`,
        body: {
          name,
          patron,
        },
      });
    } catch (error) {
      return throwError(error);
    }
  }

  public deleteTeam(teamId: number): Observable<any> {
    try {
      return this.rest.resolve<boolean>({
        method: REST.DELETE,
        url: `/api/${this.app.userId}/teams/${teamId}`,
      });
    } catch (error) {
      return throwError(error);
    }
  }
}
