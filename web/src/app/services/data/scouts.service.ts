import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Role } from 'src/app/model/data/Role';
import { Scout } from 'src/app/model/data/Scout';
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

  public getScouts(): Observable<Scout[]> {
    try {
      return this.rest.resolve<Scout[]>({
        method: REST.GET,
        url: `/api/${this.app.userId}/team/${this.app.teamId}/scouts`,
      });
    } catch (error) {
      return throwError(error);
    }
  }

  public addRole(scoutId: number, roleId: number): Observable<boolean> {
    try {
      return this.rest.resolve<boolean>({
        method: REST.POST,
        url: `/api/${this.app.userId}/scouts/${scoutId}/roles/${roleId}`,
      });
    } catch (error) {
      return throwError(error);
    }
  }

  public getRoles(scoutId: number): Observable<Role[]> {
    try {
      return this.rest.resolve<Role[]>({
        method: REST.GET,
        url: `/api/${this.app.userId}/scouts/${scoutId}/roles`,
      });
    } catch (error) {
      return throwError(error);
    }
  }

  public getAllRoles(): Observable<Role[]> {
    try {
      return this.rest.resolve<Role[]>({
        method: REST.GET,
        url: `/api/${this.app.userId}/team/${this.app.teamId}/scouts/roles`,
      });
    } catch (error) {
      return throwError(error);
    }
  }

  public addScout(scoutPayload: ScoutPayload): Observable<boolean> {
    try {
      return this.rest.resolve<boolean>({
        method: REST.POST,
        url: `/api/${this.app.userId}/team/${this.app.teamId}/scouts`,
        body: scoutPayload,
      });
    } catch (error) {
      return throwError(error);
    }
  }

  public getScout(scoutId: number): Observable<Scout> {
    try {
      return this.rest.resolve<Scout>({
        method: REST.GET,
        url: `/api/${this.app.userId}/scouts/${scoutId}`,
      });
    } catch (error) {
      return throwError(error);
    }
  }

  public patchScout(
    scoutId: number,
    scoutPayload: ScoutPayload
  ): Observable<boolean> {
    try {
      return this.rest.resolve<boolean>({
        method: REST.PATCH,
        url: `/api/${this.app.userId}/scouts/${scoutId}`,
        body: scoutPayload,
      });
    } catch (error) {
      return throwError(error);
    }
  }

  public deleteScout(scoutId: number): Observable<boolean> {
    try {
      return this.rest.resolve<boolean>({
        method: REST.DELETE,
        url: `/api/${this.app.userId}/scouts/${scoutId}`,
      });
    } catch (error) {
      return throwError(error);
    }
  }

  public deleteRole(scoutId: number, roleId: number): Observable<boolean> {
    try {
      return this.rest.resolve<boolean>({
        method: REST.DELETE,
        url: `/api/${this.app.userId}/scouts/${scoutId}/roles/${roleId}`,
      });
    } catch (error) {
      return throwError(error);
    }
  }
}
