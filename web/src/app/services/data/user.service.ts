import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from 'src/app/model/Team';
import { REST, RestService } from 'src/app/web/rest.service';

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
      method: REST.GET,
      url: `/teams`,
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
      method: REST.PATCH,
      url: `/users${userId}`,
      body: {
        name,
        surname,
        password,
        email,
      },
    });
  }
}
