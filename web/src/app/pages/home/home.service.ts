import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from 'src/app/model/Team';
import { User } from 'src/app/model/User';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private currentUserUrl = 'http://localhost:8080/core/user';
  private currentTeamUrl = 'http://localhost:8080/core/team';
  private userTeamsNoUrl = 'http://localhost:8080/teams/count';
  private userTeamsUrl = 'http://localhost:8080/teams/list';
  private setCurrentTeamUrl = 'http://localhost:8080/core/team';

  constructor(private http: HttpClient) {}

  getCurrentUser(): Observable<User> {
    const myHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    return this.http.get<User>(this.currentUserUrl, { headers: myHeaders });
  }

  getCurrentTeam(): Observable<Team> {
    const myHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    return this.http.get<Team>(this.currentTeamUrl, { headers: myHeaders });
  }

  getCurrentUserTeamsNo(): Observable<number> {
    const myHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    return this.http.get<number>(this.userTeamsNoUrl, { headers: myHeaders });
  }

  getCurrentUserTeams(): Observable<Team[]> {
    const myHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    return this.http.get<Team[]>(this.userTeamsUrl, { headers: myHeaders });
  }

  setCurrentTeam(newTeam: Team): Observable<boolean> {
    const myHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    return this.http.post<boolean>(this.setCurrentTeamUrl + newTeam.teamId, {
      headers: myHeaders,
    });
  }
}
