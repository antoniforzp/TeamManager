import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Role } from 'src/app/model/data/Role';
import { RestService, REST } from 'src/app/web/rest.service';
import { AppStateService } from '../core/app-state.service';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  constructor(private rest: RestService, private app: AppStateService) {}

  public getRoles(): Observable<Role[]> {
    try {
      return this.rest.resolve<Role[]>({
        method: REST.GET,
        url: `/api/${this.app.userId}/roles`,
      });
    } catch (error) {
      return throwError(error);
    }
  }
}
