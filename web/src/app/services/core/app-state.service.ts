import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export enum AppStateKeys {
  USER_ID = 'userId',
  USER_PASSWD = 'userPassword',
  TEAM_ID = 'teamId',
  SETT_LANG = 'lang',
  SETT_THEME = 'theme',
  OUT_LANG = 'out-lang',
}

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  cookieDuration = 1 / 24;

  constructor(private cookieService: CookieService) {}

  // CREDENTIALS

  storeUserId(userId: number): void {
    this.cookieService.set(
      AppStateKeys.USER_ID,
      `${userId}`,
      this.cookieDuration
    );
  }

  get userId(): number {
    return +this.cookieService.get(AppStateKeys.USER_ID);
  }

  storeUserPasswd(userPassword: string): void {
    this.cookieService.set(
      AppStateKeys.USER_PASSWD,
      userPassword,
      this.cookieDuration
    );
  }

  get userPasswd(): string {
    return this.cookieService.get(AppStateKeys.USER_PASSWD);
  }

  storeCurrentTeamId(teamId: number): void {
    this.cookieService.set(
      AppStateKeys.TEAM_ID,
      `${teamId}`,
      this.cookieDuration
    );
  }

  get currentTeam(): number {
    return +this.cookieService.get(AppStateKeys.TEAM_ID);
  }

  // SETTINGS

  storeLanguage(language: string): void {
    this.cookieService.set(
      AppStateKeys.SETT_LANG,
      language,
      this.cookieDuration
    );
  }

  get language(): string {
    return this.cookieService.get(AppStateKeys.SETT_LANG);
  }

  storeTheme(themeId: number): void {
    this.cookieService.set(
      AppStateKeys.SETT_THEME,
      `${themeId}`,
      this.cookieDuration
    );
  }

  get theme(): number {
    return +this.cookieService.get(AppStateKeys.SETT_THEME);
  }

  // OUTSIDE THE APP

  storeOutLanguage(language: string): void {
    this.cookieService.set(
      AppStateKeys.OUT_LANG,
      language,
      this.cookieDuration
    );
  }

  get outLanguage(): string {
    return this.cookieService.get(AppStateKeys.OUT_LANG);
  }

  // UTILS

  clearAll(): void {
    this.cookieService.deleteAll();
  }
}
