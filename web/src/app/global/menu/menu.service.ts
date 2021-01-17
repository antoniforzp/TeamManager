import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  userTeamsUrl = 'http://localhost:8080/teams/count';

  constructor(private http: HttpClient) {}

  getCurrentUserTeamsNo(): Observable<number> {
    const myHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    return this.http.get<number>(this.userTeamsUrl, { headers: myHeaders });
  }
}
