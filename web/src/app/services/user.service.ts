import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from '../model/Team';
import { REST, RestService } from '../web/rest.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private rest: RestService) {}

  public checkUser(userEmail: string): Observable<boolean> {
    return this.rest.resolve<boolean>({
      method: REST.POST,
      url: `/users/check`,
      body: {
        userEmail,
      },
    });
  }

  public addUser(
    name: string,
    surname: string,
    password: string,
    email: string
  ): Observable<boolean> {
    return this.rest.resolve<boolean>({
      method: REST.POST,
      url: `/users`,
      body: {
        name,
        surname,
        password,
        email,
      },
    });
  }

  getUserTeams(): Observable<Team[]> {
    return this.rest.resolve<Team[]>({
      method: REST.POST,
      url: `/teamsk`,
    });
  }

  editUserData(
    userId: number,
    name: string,
    surname: string,
    password: string,
    email: string
  ): Observable<boolean> {
    return this.rest.resolve<boolean>({
      method: REST.POST,
      url: `/teams${userId}`,
      body: {
        name,
        surname,
        password,
        email,
      },
    });
  }
}
