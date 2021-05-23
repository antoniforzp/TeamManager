import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Language } from 'src/app/model/Language';
import { Settings } from 'src/app/model/Settings';
import { Theme } from 'src/app/model/Theme';
import { REST, RestService } from 'src/app/web/rest.service';
import { AppStateService } from '../core/app-state.service';

export interface SettingsPayload {
  userId: number;
  language: Language;
}

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(private rest: RestService, private app: AppStateService) {}

  getSettings(): Observable<Settings> {
    return this.rest.resolve<Settings>({
      method: REST.GET,
      url: `/api/${this.app.userId}/settings`,
    });
  }

  getLanguages(): Observable<Language[]> {
    return this.rest.resolve<Language[]>({
      method: REST.GET,
      url: `/api/${this.app.userId}/settings/languages`,
    });
  }

  getThemes(): Observable<Theme[]> {
    return this.rest.resolve<Theme[]>({
      method: REST.GET,
      url: `/api/${this.app.userId}/settings/themes`,
    });
  }

  patchSettings(settings: SettingsPayload): Observable<boolean> {
    return this.rest.resolve<boolean>({
      method: REST.PATCH,
      url: `/api/${this.app.userId}/settings`,
      body: settings,
    });
  }
}
