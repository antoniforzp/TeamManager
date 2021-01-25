import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InstruktorRank } from '../model/InstructorRank';
import { Rank } from '../model/Rank';

@Injectable({
  providedIn: 'root',
})
export class RanksService {
  private getRanksUrl = 'http://localhost:8080/ranks/ranks/list';
  private getInstruktorRanksUrl =
    'http://localhost:8080/ranks/instructors/list';

  constructor(private http: HttpClient) {}

  getRanks(): Observable<Rank[]> {
    const myHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    return this.http.get<Rank[]>(this.getRanksUrl, {
      headers: myHeaders,
    });
  }

  getInstructorRanks(): Observable<InstruktorRank[]> {
    const myHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    return this.http.get<InstruktorRank[]>(this.getInstruktorRanksUrl, {
      headers: myHeaders,
    });
  }
}
