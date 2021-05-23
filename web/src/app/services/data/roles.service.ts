import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from 'src/app/model/Role';
import { RestService, REST } from 'src/app/web/rest.service';
import { AppStateService } from '../core/app-state.service';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  constructor(private rest: RestService, private app: AppStateService) {}

  getRoles(): Observable<Role[]> {
    return this.rest.resolve<Role[]>({
      method: REST.GET,
      url: `/api/${this.app.userId}/roles`,
    });
  }
}
