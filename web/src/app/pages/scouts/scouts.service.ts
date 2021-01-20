import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Scout } from 'src/app/model/Scout';

@Injectable({
  providedIn: 'root',
})
export class ScoutsService {
  getScoutsUrl = 'http://localhost:8080/scouts/list';

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
}
