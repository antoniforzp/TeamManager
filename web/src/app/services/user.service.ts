import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/User';
import { Team } from '../model/Team';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  checkUserMailUrl = 'http://localhost:8080/user/check';
  addUserMailUrl = 'http://localhost:8080/user/add';
  editUserDataUrl = 'http://localhost:8080/user/edit';
  getTeamsUrl = 'http://localhost:8080/teams/list';

  constructor(private http: HttpClient) {}

  public checkEmail(userEmail: string): Observable<boolean> {
    const myHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    return this.http.post<boolean>(this.checkUserMailUrl + userEmail, {
      headers: myHeaders,
    });
  }

  public addUser(newUser: User): Observable<boolean> {
    const myHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    return this.http.post<boolean>(
      this.addUserMailUrl,
      JSON.stringify(newUser),
      {
        headers: myHeaders,
      }
    );
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
