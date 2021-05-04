import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Troop } from 'src/app/model/Troop';
import { RestService, REST } from 'src/app/web/rest.service';

@Injectable({
  providedIn: 'root',
})
export class TroopsService {
  constructor(private rest: RestService) {}

  getTroops(): Observable<Troop[]> {
    return this.rest.resolve<Troop[]>({
      method: REST.GET,
      url: `/troops`,
    });
  }

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

  deleteTroop(troopId: number): Observable<boolean> {
    return this.rest.resolve<boolean>({
      method: REST.DELETE,
      url: `/troops${troopId}`,
    });
  }
}
