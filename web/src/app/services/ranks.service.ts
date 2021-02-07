import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InstruktorRank } from '../model/InstructorRank';
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

  getInstructorRanks(): Observable<InstruktorRank[]> {
    return this.rest.resolve<InstruktorRank[]>({
      method: REST.GET,
      url: `/iranks`,
    });
  }
}
