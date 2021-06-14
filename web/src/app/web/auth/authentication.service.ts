import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AuthenticationResponse } from 'src/app/model/auth/AuthenticationResponse';
import { Login } from 'src/app/model/data/Login';
import { RestService, REST } from 'src/app/web/rest.service';
import { EncryptionService } from './encryption.service';

export interface AuthenticationRequest {
  login: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private rest: RestService,
    private encryptService: EncryptionService
  ) {}

  public login(
    email: string,
    password: string
  ): Observable<AuthenticationResponse> {
    const authRequest: AuthenticationRequest = {
      login: email,
      password: this.encryptService.encrypt(password),
    };

    try {
      return this.rest.resolve({
        method: REST.POST,
        url: `/api/auth`,
        body: authRequest,
      });
    } catch (error) {
      return throwError(error);
    }
  }
}
