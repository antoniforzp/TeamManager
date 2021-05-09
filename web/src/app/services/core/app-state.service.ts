import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export enum AppStateKeys {
  USER_ID = 'userId',
  USER_PASSWD = 'userPassword',
  SETT_LANG = 'lang',
  SETT_THEME = 'theme',
}

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  constructor(private cookieService: CookieService) {}

  // CREDENTIALS

  storeUserId(userId: number): void {
    this.cookieService.set(AppStateKeys.USER_ID, `${userId}`, 1 / 2);
  }

  getUserId(): number {
    return +this.cookieService.get(AppStateKeys.USER_ID);
  }

  storeUserPasswd(userPassword: string): void {
    this.cookieService.set(AppStateKeys.USER_PASSWD, userPassword, 1 / 2);
  }

  getUserPasswd(): string {
    return this.cookieService.get(AppStateKeys.USER_PASSWD);
  }

  // SETTINGS

  storeLanguage(language: string): void {
    this.cookieService.set(AppStateKeys.SETT_LANG, language, 1 / 2);
  }

  getLanguage(): string {
    return this.cookieService.get(AppStateKeys.SETT_LANG);
  }

  storeTheme(themeId: number): void {
    this.cookieService.set(AppStateKeys.SETT_THEME, `${themeId}`, 1 / 2);
  }

  getTheme(): number {
    return +this.cookieService.get(AppStateKeys.SETT_THEME);
  }

  // UTILS

  clearAll(): void {
    this.cookieService.deleteAll();
  }
}
