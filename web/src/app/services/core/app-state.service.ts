import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { SessionExpiredModal } from 'src/app/modals/common/session-expired-modal/session-expired-modal';
import { AthenticationError } from 'src/app/model/errors/AuthenticationError';

export enum AppStateKeys {
  LOGGED = 'logged',
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
  errorMessage = 'Session has expired';
  modalOpened = false;

  clearable: AppStateKeys[] = [
    AppStateKeys.USER_ID,
    AppStateKeys.USER_PASSWD,
    AppStateKeys.USER_PASSWD,
    AppStateKeys.TEAM_ID,
    AppStateKeys.SETT_LANG,
    AppStateKeys.SETT_THEME,
  ];

  constructor(
    private cookieService: CookieService,
    private dialog: MatDialog
  ) {}

  // CREDENTIALS

  storeUserId(userId: number): void {
    this.cookieService.set(
      AppStateKeys.USER_ID,
      `${userId}`,
      this.cookieDuration
    );
  }

  get userId(): number {
    const value = +this.cookieService.get(AppStateKeys.USER_ID);
    return this.checkNumber(value, 'userId');
  }

  storeUserPasswd(userPassword: string): void {
    this.cookieService.set(
      AppStateKeys.USER_PASSWD,
      userPassword,
      this.cookieDuration
    );
  }

  get userPasswd(): string {
    const data = this.cookieService.get(AppStateKeys.USER_PASSWD);
    return this.checkString(data, 'userPasswd');
  }

  storeCurrentTeamId(teamId: number): void {
    this.cookieService.set(
      AppStateKeys.TEAM_ID,
      `${teamId}`,
      this.cookieDuration
    );
  }

  get teamId(): number {
    const data = +this.cookieService.get(AppStateKeys.TEAM_ID);
    return this.checkNumber(data, 'teamId');
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
    const data = this.cookieService.get(AppStateKeys.SETT_LANG);
    return data; // ommit checking
  }

  storeTheme(themeId: number): void {
    this.cookieService.set(
      AppStateKeys.SETT_THEME,
      `${themeId}`,
      this.cookieDuration
    );
  }

  get theme(): number {
    const data = +this.cookieService.get(AppStateKeys.SETT_THEME);
    return data; // ommit checking
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
    const data = this.cookieService.get(AppStateKeys.OUT_LANG);
    return data; // ommit checking
  }

  // UTILS

  clearAllClearable(): void {
    this.clearable.forEach((x) => this.cookieService.delete(x));
  }

  // DATA CHECKING

  private checkNumber(value: number, cookieName: string): number {
    if (isNaN(value) || value <= 0) {
      this.thorwError(cookieName);
      return undefined;
    }

    return value;
  }

  private checkString(value: string, cookieName: string): string {
    if (value || value !== '') {
      this.thorwError(cookieName);
      return undefined;
    }

    return value;
  }

  private thorwError(cookieName: string): void {
    if (!this.modalOpened) {
      this.modalOpened = true;
      new SessionExpiredModal(this.dialog).open().then((x) =>
        x.afterClosed().subscribe(() => {
          this.clearAllClearable();
          this.modalOpened = false;
        })
      );
    }

    throw new AthenticationError(cookieName);
  }
}
