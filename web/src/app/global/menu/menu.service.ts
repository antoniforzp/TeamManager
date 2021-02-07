import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Team } from 'src/app/model/Team';
import { REST, RestService } from 'src/app/web/rest.service';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor(private rest: RestService) {}

  getCurrentUserTeamsNo(): Observable<number> {
    return this.rest
      .resolve<Team[]>({
        method: REST.GET,
        url: `/teams`,
      })
      .pipe(map((x) => x.length));
  }
}
