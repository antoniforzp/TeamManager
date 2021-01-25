import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from 'src/app/model/Team';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  private getTeamsUrl = 'http://localhost:8080/teams/list';
  private addTeamUrl = 'http://localhost:8080/teams/add';
  private editTeamsUrl = 'http://localhost:8080/teams/edit';
  private deleteTeamUrl = 'http://localhost:8080/teams/remove';

  constructor(private http: HttpClient) {}

  editTeam(teamId: number, newTeam: Team): Observable<any> {
    const myHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    return this.http.post(this.editTeamsUrl + teamId, JSON.stringify(newTeam), {
      headers: myHeaders,
    });
  }

  deleteTeam(teamId: number): Observable<any> {
    const myHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    return this.http.delete(this.deleteTeamUrl + teamId, {
      headers: myHeaders,
    });
  }

  addTeam(newTeam: Team): Observable<any> {
    const myHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    return this.http.put(this.addTeamUrl, JSON.stringify(newTeam), {
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
