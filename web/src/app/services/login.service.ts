import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { REST, RestService } from '../web/rest.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private rest: RestService) {}

  public login(email: string, password: string): Observable<boolean> {
    return this.rest.resolve<boolean>({
      method: REST.POST,
      url: `/login`,
      body: {
        email,
        password,
      },
    });
  }
}
