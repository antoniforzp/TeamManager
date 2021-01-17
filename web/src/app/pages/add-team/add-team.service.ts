import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from 'src/app/model/Team';

@Injectable({
  providedIn: 'root',
})
export class AddTeamService {
  getTeamsUrl = 'http://localhost:8080/teams/list';
  addTeamUrl = 'http://localhost:8080/teams/add';

  constructor(private http: HttpClient) {}

  addTeam(newTeam: Team): Observable<any> {
    const myHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    console.log(newTeam);

    // TODO: COrs blokuje, sprawdzić w postmanie
    return this.http.post(this.addTeamUrl, JSON.stringify(newTeam), {
      headers: myHeaders,
    });
  }

  getUserTeams(): Observable<Team[]> {
    const myHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    return this.http.get<Team[]>(this.getTeamsUrl, {
      headers: myHeaders,
    });
  }
}
