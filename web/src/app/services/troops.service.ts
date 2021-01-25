import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Troop } from '../model/Troop';

@Injectable({
  providedIn: 'root',
})
export class TroopsService {
  private getTroopsUrl = 'http://localhost:8080/troops/list';

  constructor(private http: HttpClient) {}

  getTroops(): Observable<Troop[]> {
    const myHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    return this.http.get<Troop[]>(this.getTroopsUrl, {
      headers: myHeaders,
    });
  }
}
