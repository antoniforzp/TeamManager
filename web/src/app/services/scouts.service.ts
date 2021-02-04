import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Scout } from 'src/app/model/Scout';
import { Role } from '../model/Role';

@Injectable({
  providedIn: 'root',
})
export class ScoutsService {
  private getScoutsUrl = 'http://localhost:8080/scouts/list';
  private getRolesScoutUrl = 'http://localhost:8080/scouts/roles/list';
  private getRolesAllUrl = 'http://localhost:8080/scouts/roles/list/all';
  private addScoutUrl = 'http://localhost:8080/scouts/add';
  private editScoutUrl = 'http://localhost:8080/scouts/edit';
  // private addScoutRole = 'http://localhost:8080/scots/add/role';

  constructor(private http: HttpClient) {}

  getScouts(): Observable<Scout[]> {
    const myHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    return this.http.get<Scout[]>(this.getScoutsUrl, {
      headers: myHeaders,
    });
  }

  addRole(scoutId: number, roleId: number): Observable<boolean> {
    const myHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    return this.http.post<boolean>(
      `http://localhost:8080/scots/add/role${scoutId}/${roleId}`,
      {
        headers: myHeaders,
      }
    );
  }

  getRoles(scoutId: number): Observable<Role[]> {
    const myHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    return this.http.get<Role[]>(this.getRolesScoutUrl + scoutId, {
      headers: myHeaders,
    });
  }

  getAllRoles(): Observable<Role[]> {
    const myHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    return this.http.get<Role[]>(this.getRolesAllUrl, {
      headers: myHeaders,
    });
  }

  addScout(newScout: Scout): Observable<boolean> {
    const myHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    return this.http.post<boolean>(this.addScoutUrl, JSON.stringify(newScout), {
      headers: myHeaders,
    });
  }

  editScout(scoutId: number, newScout: Scout): Observable<boolean> {
    const myHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    return this.http.post<boolean>(
      this.editScoutUrl + scoutId,
      JSON.stringify(newScout),
      {
        headers: myHeaders,
      }
    );
  }
}
