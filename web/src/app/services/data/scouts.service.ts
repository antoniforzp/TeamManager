import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from 'src/app/model/Role';
import { Scout } from 'src/app/model/Scout';
import { REST, RestService } from 'src/app/web/rest.service';
import { AppStateService } from '../core/app-state.service';

export interface ScoutPayload {
  name: string;
  surname: string;
  pesel: string;
  birthDate: Date;
  address: string;
  postalCode: string;
  city: string;
  phone: string;
  troopId: number;
  rankId: number;
  instructorRankId: number;
}

@Injectable({
  providedIn: 'root',
})
export class ScoutsService {
  constructor(private rest: RestService, private app: AppStateService) {}

  getScouts(): Observable<Scout[]> {
    return this.rest.resolve<Scout[]>({
      method: REST.GET,
      url: `/api/${this.app.userId}/team/${this.app.teamId}/scouts`,
    });
  }

  addRole(scoutId: number, roleId: number): Observable<boolean> {
    return this.rest.resolve<boolean>({
      method: REST.POST,
      url: `/api/${this.app.userId}/scouts/${scoutId}/roles/${roleId}`,
    });
  }

  getRoles(scoutId: number): Observable<Role[]> {
    return this.rest.resolve<Role[]>({
      method: REST.GET,
      url: `/api/${this.app.userId}/scouts/${scoutId}/roles`,
    });
  }

  getAllRoles(): Observable<Role[]> {
    return this.rest.resolve<Role[]>({
      method: REST.GET,
      url: `/api/${this.app.userId}/team/${this.app.teamId}/scouts/roles`,
    });
  }

  addScout(scoutPayload: ScoutPayload): Observable<boolean> {
    return this.rest.resolve<boolean>({
      method: REST.POST,
      url: `/api/${this.app.userId}/team/${this.app.teamId}/scouts`,
      body: scoutPayload,
    });
  }

  getScout(scoutId: number): Observable<Scout> {
    return this.rest.resolve<Scout>({
      method: REST.GET,
      url: `/api/${this.app.userId}/scouts/${scoutId}`,
    });
  }

  patchScout(scoutId: number, scoutPayload: ScoutPayload): Observable<boolean> {
    return this.rest.resolve<boolean>({
      method: REST.PATCH,
      url: `/api/${this.app.userId}/scouts/${scoutId}`,
      body: scoutPayload,
    });
  }

  deleteScout(scoutId: number): Observable<boolean> {
    return this.rest.resolve<boolean>({
      method: REST.DELETE,
      url: `/api/${this.app.userId}/scouts/${scoutId}`,
    });
  }

  deleteRole(scoutId: number, roleId: number): Observable<boolean> {
    return this.rest.resolve<boolean>({
      method: REST.DELETE,
      url: `/api/${this.app.userId}/scouts/${scoutId}/roles/${roleId}`,
    });
  }
}
