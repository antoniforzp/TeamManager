import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IRank } from 'src/app/model/data/IRank';
import { Rank } from 'src/app/model/data/Rank';
import { RestService, REST } from 'src/app/web/rest.service';
import { AppStateService } from '../core/app-state.service';

@Injectable({
  providedIn: 'root',
})
export class RanksService {
  constructor(private rest: RestService, private app: AppStateService) {}

  public getRanks(): Observable<Rank[]> {
    try {
      return this.rest.resolve<Rank[]>({
        method: REST.GET,
        url: `/api/${this.app.userId}/ranks`,
      });
    } catch (error) {
      return throwError(error);
    }
  }

  public getInstructorRanks(): Observable<IRank[]> {
    try {
      return this.rest.resolve<IRank[]>({
        method: REST.GET,
        url: `/api/${this.app.userId}/iranks`,
      });
    } catch (error) {
      return throwError(error);
    }
  }
}
