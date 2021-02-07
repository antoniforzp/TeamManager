import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../model/Role';
import { REST, RestService } from '../web/rest.service';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  constructor(private rest: RestService) {}

  getRoles(): Observable<Role[]> {
    return this.rest.resolve<Role[]>({
      method: REST.GET,
      url: `/roles`,
    });
  }
}
