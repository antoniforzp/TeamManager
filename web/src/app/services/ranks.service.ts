import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InstructorRank } from '../model/InstructorRank';
import { Rank } from '../model/Rank';
import { REST, RestService } from '../web/rest.service';

@Injectable({
  providedIn: 'root',
})
export class RanksService {
  constructor(private rest: RestService) {}

  getRanks(): Observable<Rank[]> {
    return this.rest.resolve<Rank[]>({
      method: REST.GET,
      url: `/ranks`,
    });
  }

  getInstructorRanks(): Observable<InstructorRank[]> {
    return this.rest.resolve<InstructorRank[]>({
      method: REST.GET,
      url: `/iranks`,
    });
  }
}
