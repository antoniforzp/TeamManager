import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Team } from 'src/app/model/data/Team';
import { EncryptionService } from 'src/app/web/auth/encryption.service';
import { REST, RestService } from 'src/app/web/rest.service';
import { AppStateService } from '../core/app-state.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private rest: RestService,
    private app: AppStateService,
    private encryptionService: EncryptionService
  ) {}

  public checkUser(userEmail: string): Observable<boolean> {
    try {
      return this.rest.resolve<boolean>({
        method: REST.POST,
        url: `/api/users/check`,
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
        url: `/api/users`,
        body: {
          name,
          surname,
          password: this.encryptionService.encrypt(password),
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
        url: `/api/${this.app.userId}/teams`,
      });
    } catch (error) {
      return throwError(error);
    }
  }

  public editUserData(
    name: string,
    surname: string,
    password: string,
    email: string
  ): Observable<boolean> {
    try {
      return this.rest.resolve<boolean>({
        method: REST.PATCH,
        url: `/api/${this.app.userId}/users`,
        body: {
          name,
          surname,
          password: this.encryptionService.encrypt(password),
          email,
        },
      });
    } catch (error) {
      return throwError(error);
    }
  }
}
