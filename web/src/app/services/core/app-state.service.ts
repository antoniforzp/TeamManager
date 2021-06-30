import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { SessionExpiredModal } from 'src/app/modals/common/session-expired-modal/session-expired-modal';
import { Team } from 'src/app/model/data/Team';
import { AuthenticationError } from 'src/app/model/errors/AuthenticationError';

export enum AppStateKeys {
  LOGGED = 'logged',
  AUTH_TOKEN = 'token',
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
  cookieDuration = (1 / 24) * 2;
  errorMessage = 'Session has expired';
  modalOpened = false;

  clearable: AppStateKeys[] = [
    AppStateKeys.AUTH_TOKEN,
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

  storeAuthToken(token: string): void {
    this.cookieService.set(
      AppStateKeys.AUTH_TOKEN,
      `${token}`,
      this.cookieDuration
    );
  }

  get authToken(): string {
    const value = this.cookieService.get(AppStateKeys.AUTH_TOKEN);
    return this.updateDuration(value, AppStateKeys.AUTH_TOKEN); // Omit checking
  }

  storeUserId(userId: number): void {
    this.cookieService.set(
      AppStateKeys.USER_ID,
      `${userId}`,
      this.cookieDuration
    );
  }

  get userId(): number {
    const value = this.cookieService.get(AppStateKeys.USER_ID);
    return this.updateDuration(
      this.checkNumber(value, 'userId'),
      AppStateKeys.USER_ID
    );
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
    return this.updateDuration(
      this.checkString(data, 'userPasswd'),
      AppStateKeys.USER_PASSWD
    );
  }

  storeCurrentTeamId(teamId: number): void {
    this.cookieService.set(
      AppStateKeys.TEAM_ID,
      `${teamId ? teamId : ''}`,
      this.cookieDuration
    );
  }

  checkCurrentTeamId(newUserTeams: Team[]): void {
    if (newUserTeams.length > 0) {
      this.storeCurrentTeamId(newUserTeams[0].teamId);
    } else {
      this.storeCurrentTeamId(null);
    }
  }

  get teamId(): number {
    const data = this.cookieService.get(AppStateKeys.TEAM_ID);
    return data !== 'null' ? this.checkNumber(data, 'teamId') : undefined; // This can be undefined
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
    return this.updateDuration(data, AppStateKeys.SETT_LANG); // Omit checking
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
    return this.updateDuration(data, AppStateKeys.SETT_THEME); // Omit checking
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
    return this.updateDuration(data, AppStateKeys.OUT_LANG); // Omit checking
  }

  // UTILS

  clearAllClearable(): void {
    this.clearable.forEach((x) => this.cookieService.delete(x));
  }

  // DATA CHECKING

  private checkNumber(value: string, cookieName: string): number {
    if (value === 'null') {
      this.throwError(cookieName);
      return undefined;
    }

    const num = +value;
    if (isNaN(num) || num <= 0) {
      this.throwError(cookieName);
      return undefined;
    }

    return num;
  }

  private checkString(value: string, cookieName: string): string {
    if (value || value !== '') {
      this.throwError(cookieName);
      return undefined;
    }

    return value;
  }

  private throwError(cookieName: string): void {
    if (!this.modalOpened) {
      this.modalOpened = true;
      new SessionExpiredModal(this.dialog).open().then((x) =>
        x.afterClosed().subscribe(() => {
          this.clearAllClearable();
          this.modalOpened = false;
        })
      );
    }

    throw new AuthenticationError(cookieName);
  }

  // UPDATING DURATION

  private updateDuration(value: any, cookieName: string): any {
    // this.cookieService.set(cookieName, value, this.cookieDuration);
    return value;
  }
}
