import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Login } from 'src/app/model/data/Login';
import { RestService, REST } from 'src/app/web/rest.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private rest: RestService) {}

  public login(email: string, password: string): Observable<Login> {
    try {
      return this.rest.resolve({
        method: REST.GET,
        url: `/api/login/${email}/${password}`,
      });
    } catch (error) {
      return throwError(error);
    }
  }
}
