import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Settings } from 'src/app/model/data/Settings';
import { AppSettingsService } from './app-settings.service';
import { AppStateService } from './app-state.service';

@Injectable({
  providedIn: 'root',
})
export class AppInitService {
  constructor(
    private app: AppStateService,
    private appSettingsService: AppSettingsService
  ) {}

  public initCore(token: string, userId: number, teamId: number): void {
    this.app.storeAuthToken(token);
    this.app.storeUserId(userId);
    this.app.storeCurrentTeamId(teamId);
  }

  public initSettings(): Observable<Settings> {
    return this.appSettingsService.initSetttings();
  }

  public initLanguageFromLogin(langAbbreviation: string): Observable<boolean> {
    return this.appSettingsService.patchLanguage(langAbbreviation);
  }
}
