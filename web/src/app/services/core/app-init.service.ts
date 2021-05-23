import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Settings } from 'src/app/model/Settings';
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

  public initCore(userId: number, teamId: number): void {
    this.app.storeUserId(userId);
    this.app.storeCurrentTeamId(teamId);

    console.log(userId, teamId);
  }

  public initSettings(): Observable<Settings> {
    return this.appSettingsService.initSetttings();
  }
}
