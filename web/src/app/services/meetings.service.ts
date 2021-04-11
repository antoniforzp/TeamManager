import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Meeting } from '../model/Meeting';
import { REST, RestService } from '../web/rest.service';

@Injectable({
  providedIn: 'root',
})
export class MeetingsService {
  constructor(private rest: RestService) {}

  getMeetings(): Observable<Meeting[]> {
    return this.rest.resolve<Meeting[]>({
      method: REST.GET,
      url: `/meetings`,
    });
  }
}
