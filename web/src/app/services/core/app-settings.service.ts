import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Settings } from 'src/app/model/Settings';
import { SettingsService } from '../data/settings.service';
import { AppStateService } from './app-state.service';

@Injectable({
  providedIn: 'root',
})
export class AppSettingsService {
  constructor(
    private appStateService: AppStateService,
    private settingsService: SettingsService
  ) {}

  initSetttings(): Observable<Settings> {
    return this.settingsService.getSettings().pipe(
      tap((x) => {
        this.appStateService.storeUserId(x.userId);
        this.appStateService.storeTheme(x.theme.themeId);

        // Inherit language set in login screen
        const outLang = this.appStateService.getOutLanguage();
        outLang
          ? this.appStateService.storeLanguage(outLang)
          : this.appStateService.storeOutLanguage(x.language.abbreviation);
      })
    );
  }

  patchSettings(settings: Settings): Observable<boolean> {
    return this.settingsService.patchSettings(settings).pipe(
      tap((x) => {
        if (x === true) {
          this.appStateService.storeLanguage(settings.language.abbreviation);
          this.appStateService.storeOutLanguage(settings.language.abbreviation);
          this.appStateService.storeTheme(settings.theme.themeId);
        }
      })
    );
  }

  clearOnLogout(): Observable<boolean> {
    this.appStateService.clearAll();
    return of(true);
  }
}
