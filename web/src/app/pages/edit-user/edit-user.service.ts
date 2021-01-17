import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from 'src/app/model/Team';
import { User } from 'src/app/model/User';

@Injectable({
  providedIn: 'root',
})
export class EditUserService {
  editUserDataUrl = 'http://localhost:8080/user/edit';
  getTeamsUrl = 'http://localhost:8080/teams/list';
  editTeamsUrl = 'http://localhost:8080/teams/edit';
  deleteTeamUrl = 'http://localhost:8080/teams/remove';

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

  getUserTeams(): Observable<Team[]> {
    const myHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    return this.http.get<Team[]>(this.getTeamsUrl, {
      headers: myHeaders,
    });
  }

  editUserData(newUser: User): Observable<any> {
    const myHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    return this.http.post(
      this.editUserDataUrl + newUser.userId,
      JSON.stringify(newUser),
      {
        headers: myHeaders,
      }
    );
  }
}
