import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Language } from 'src/app/model/data/Language';
import { Settings } from 'src/app/model/data/Settings';
import { Theme } from 'src/app/model/data/Theme';
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

  public getSettings(): Observable<Settings> {
    try {
      return this.rest.resolve<Settings>({
        method: REST.GET,
        url: `/api/${this.app.userId}/settings`,
      });
    } catch (error) {
      return throwError(error);
    }
  }

  public getLanguages(): Observable<Language[]> {
    try {
      return this.rest.resolve<Language[]>({
        method: REST.GET,
        url: `/api/${this.app.userId}/settings/languages`,
      });
    } catch (error) {
      return throwError(error);
    }
  }

  public getLanguagesNoUser(): Observable<Language[]> {
    try {
      return this.rest.resolve<Language[]>({
        method: REST.GET,
        url: `/api/${0}/settings/languages`,
      });
    } catch (error) {
      return throwError(error);
    }
  }

  public getThemes(): Observable<Theme[]> {
    try {
      return this.rest.resolve<Theme[]>({
        method: REST.GET,
        url: `/api/${this.app.userId}/settings/themes`,
      });
    } catch (error) {
      return throwError(error);
    }
  }

  public patchLanguage(langAbbreviation: string): Observable<boolean> {
    try {
      return this.rest.resolve<boolean>({
        method: REST.PATCH,
        url: `/api/${this.app.userId}/settings/language/${langAbbreviation}`,
      });
    } catch (error) {
      return throwError(error);
    }
  }

  public patchSettings(settings: SettingsPayload): Observable<boolean> {
    try {
      return this.rest.resolve<boolean>({
        method: REST.PATCH,
        url: `/api/${this.app.userId}/settings`,
        body: settings,
      });
    } catch (error) {
      return throwError(error);
    }
  }
}
