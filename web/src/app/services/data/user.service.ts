import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Team } from 'src/app/model/data/Team';
import { REST, RestService } from 'src/app/web/rest.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private rest: RestService) {}

  public checkUser(userEmail: string): Observable<boolean> {
    try {
      return this.rest.resolve<boolean>({
        method: REST.POST,
        url: `/users/check`,
        body: {
          userEmail,
        },
      });
    } catch (error) {
      return throwError(error);
    }
  }

  public addUser(
    name: string,
    surname: string,
    password: string,
    email: string
  ): Observable<boolean> {
    try {
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
    } catch (error) {
      return throwError(error);
    }
  }

  public getUserTeams(): Observable<Team[]> {
    try {
      return this.rest.resolve<Team[]>({
        method: REST.GET,
        url: `/teams`,
      });
    } catch (error) {
      return throwError(error);
    }
  }

  public editUserData(
    userId: number,
    name: string,
    surname: string,
    password: string,
    email: string
  ): Observable<boolean> {
    try {
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
    } catch (error) {
      return throwError(error);
    }
  }
}
