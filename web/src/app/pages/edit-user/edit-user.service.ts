import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from 'src/app/model/Team';
import { User } from 'src/app/model/User';

@Injectable({
  providedIn: 'root',
})
export class EditUserService {
  getUserTeamsUrl = 'http://localhost:8080/teams/list';
  editUserDataUrl = 'http://localhost:8080/user/edit';

  constructor(private http: HttpClient) {}

  deleteTeam(teamId: number): void {
    console.log({
      toDelete: teamId,
    });
  }

  getUserTeams(): Observable<Team[]> {
    const myHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    return this.http.get<Team[]>(this.getUserTeamsUrl, {
      headers: myHeaders,
    });
  }

  editUserData(newUser: User): Observable<any> {
    const myHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    return this.http.post(this.editUserDataUrl + newUser.userId, JSON.stringify(newUser), {
      headers: myHeaders,
    });
  }
}
