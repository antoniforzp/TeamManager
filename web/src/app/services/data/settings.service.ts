import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Language } from 'src/app/model/Language';
import { Settings } from 'src/app/model/Settings';
import { REST, RestService } from 'src/app/web/rest.service';

export interface SettingsPayload {
  userId: number;
  language: Language;
}

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(private rest: RestService) {}

  getSettings(): Observable<Settings> {
    return this.rest.resolve<Settings>({
      method: REST.GET,
      url: `/settings`,
    });
  }

  getLanguages(): Observable<Language[]> {
    return this.rest.resolve<Language[]>({
      method: REST.GET,
      url: `/settings/languages`,
    });
  }

  patchSettings(settings: SettingsPayload): Observable<boolean> {
    return this.rest.resolve<boolean>({
      method: REST.PATCH,
      url: `/settings`,
      body: settings,
    });
  }
}
