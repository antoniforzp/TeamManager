import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Troop } from '../model/Troop';
import { REST, RestService } from '../web/rest.service';

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
}
