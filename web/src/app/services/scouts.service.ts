import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Scout } from 'src/app/model/Scout';
import { Role } from '../model/Role';
import { REST, RestService } from '../web/rest.service';

@Injectable({
  providedIn: 'root',
})
export class ScoutsService {
  constructor(private rest: RestService) {}

  getScouts(): Observable<Scout[]> {
    return this.rest.resolve<Scout[]>({
      method: REST.GET,
      url: `/scouts`,
    });
  }

  addRole(scoutId: number, roleId: number): Observable<boolean> {
    return this.rest.resolve<boolean>({
      method: REST.POST,
      url: `/scouts${scoutId}/roles${roleId}`,
    });
  }

  addRoles(scoutId: number, rolesIds: number[]): Observable<boolean> {
    return this.rest.resolve<boolean>({
      method: REST.POST,
      url: `/scouts${scoutId}/roles`,
      body: {
        rolesIds,
      },
    });
  }

  getRoles(scoutId: number): Observable<Role[]> {
    return this.rest.resolve<Role[]>({
      method: REST.GET,
      url: `/scouts${scoutId}/roles`,
    });
  }

  getAllRoles(): Observable<Role[]> {
    return this.rest.resolve<Role[]>({
      method: REST.GET,
      url: `/scouts/roles`,
    });
  }

  addScout(
    name: string,
    surname: string,
    pesel: string,
    birthDate: Date,
    address: string,
    postalCode: string,
    city: string,
    phone: string,
    troopId: number,
    rankId: number,
    instructorRank: number
  ): Observable<boolean> {
    return this.rest.resolve<boolean>({
      method: REST.POST,
      url: `/scouts/add`,
      body: {
        name,
        surname,
        pesel,
        birthDate,
        address,
        postalCode,
        city,
        phone,
        troopId,
        rankId,
        instructorRank,
      },
    });
  }

  getScout(scoutId: number): Observable<Scout> {
    return this.rest.resolve<Scout>({
      method: REST.GET,
      url: `/scouts${scoutId}`,
    });
  }

  patchScout(
    scoutId: number,
    name: string,
    surname: string,
    pesel: string,
    birthDate: Date,
    address: string,
    postalCode: string,
    city: string,
    phone: string,
    troopId: number,
    rankId: number,
    instructorRank: number
  ): Observable<boolean> {
    return this.rest.resolve<boolean>({
      method: REST.PATCH,
      url: `/scouts${scoutId}`,
      body: {
        name,
        surname,
        pesel,
        birthDate,
        address,
        postalCode,
        city,
        phone,
        troopId,
        rankId,
        instructorRank,
      },
    });
  }
}
