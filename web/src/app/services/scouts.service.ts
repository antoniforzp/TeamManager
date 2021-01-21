import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Scout } from 'src/app/model/Scout';
import { Role } from '../model/Role';

@Injectable({
  providedIn: 'root',
})
export class ScoutsService {
  getScoutsUrl = 'http://localhost:8080/scouts/list';
  getRolesUrl = 'http://localhost:8080/scouts/roles/list';

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

  getRoles(scoutId: number): Observable<Role[]> {
    const myHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    return this.http.get<Role[]>(this.getRolesUrl + scoutId, {
      headers: myHeaders,
    });
  }
}
