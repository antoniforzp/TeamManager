import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../model/Role';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  private getRolesUrl = 'http://localhost:8080/roles/list';

  constructor(private http: HttpClient) {}

  getRoles(): Observable<Role[]> {
    const myHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    return this.http.get<Role[]>(this.getRolesUrl, {
      headers: myHeaders,
    });
  }
}
