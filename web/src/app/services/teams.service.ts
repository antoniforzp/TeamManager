import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Team } from '../model/team';
import { AbstractRestService } from './abstractService';

@Injectable({
  providedIn: 'root',
})
export class TeamsService extends AbstractRestService {
  private API_ADD_USER = this.URL + '/teams/add';
  private GET_LOGGED_USER = this.URL + '/teams/get';

  constructor(private http: HttpClient) {
    super();
  }

  private getFakeTeam(): Team {
    return {
      teamId: 0,
      name: '100 Łódzka Drużyna Harcerzy "Serviam',
      patron: 'im. Jerzego Grodyńskiego',
    };
  }

  public getCurrentTeam(): Observable<Team> {
    return of(this.getFakeTeam());
    // TODO: return data from DB
    // return this.http.get<Team>();
  }
}
