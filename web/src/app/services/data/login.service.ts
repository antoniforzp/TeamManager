import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from 'src/app/model/Login';
import { RestService, REST } from 'src/app/web/rest.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private rest: RestService) {}

  public login(email: string, password: string): Observable<Login> {
    return this.rest.resolve({
      method: REST.GET,
      url: `/api/login/${email}/${password}`,
    });
  }
}
