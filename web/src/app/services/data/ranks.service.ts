import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRank } from 'src/app/model/IRank';
import { Rank } from 'src/app/model/Rank';
import { RestService, REST } from 'src/app/web/rest.service';
import { AppStateService } from '../core/app-state.service';

@Injectable({
  providedIn: 'root',
})
export class RanksService {
  constructor(private rest: RestService, private app: AppStateService) {}

  getRanks(): Observable<Rank[]> {
    return this.rest.resolve<Rank[]>({
      method: REST.GET,
      url: `/api/${this.app.userId}/ranks`,
    });
  }

  getInstructorRanks(): Observable<IRank[]> {
    return this.rest.resolve<IRank[]>({
      method: REST.GET,
      url: `/api/${this.app.userId}/iranks`,
    });
  }
}
