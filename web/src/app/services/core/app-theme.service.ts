import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  claretTheme,
  defaultTheme,
  AppThemeDef,
  appThemeDefs,
} from '../../utils/ThemeDefs';

@Injectable({
  providedIn: 'root',
})
export class AppThemeService {
  getAvailableThemes(): AppThemeDef[] {
    return appThemeDefs;
  }

  setDefaultTheme(): void {
    this.setTheme(defaultTheme);
  }

  setClaretTheme(): void {
    this.setTheme(claretTheme);
  }

  setTheme(theme: AppThemeDef): void {
    Object.keys(theme.properties).forEach((property) => {
      document.documentElement.style.setProperty(
        property,
        theme.properties[property]
      );
    });
  }

  setThemeById(themeId: number): void {
    const found = appThemeDefs.find((x) => x.themeId === themeId);
    const theme = found ? found : defaultTheme;

    Object.keys(theme.properties).forEach((property) => {
      document.documentElement.style.setProperty(
        property,
        theme.properties[property]
      );
    });
  }

  clearOnLogout(): Observable<boolean> {
    this.setDefaultTheme();
    return of(true);
  }
}
