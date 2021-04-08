import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Troop } from '../model/Troop';
import { REST, RestService } from '../web/rest.service';

@Injectable({
  providedIn: 'root',
})
export class TroopsService {
  constructor(private rest: RestService) {}

  addTroop(name: string): Observable<boolean> {
    return this.rest.resolve<boolean>({
      method: REST.POST,
      url: `/troops`,
      body: {
        name,
      },
    });
  }

  patchTroop(troopId: number, name: string): Observable<boolean> {
    return this.rest.resolve<boolean>({
      method: REST.PATCH,
      url: `/troops${troopId}`,
      body: {
        name,
      },
    });
  }

  getTroops(): Observable<Troop[]> {
    return this.rest.resolve<Troop[]>({
      method: REST.GET,
      url: `/troops`,
    });
  }
}
