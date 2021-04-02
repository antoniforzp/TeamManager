import { Injectable } from '@angular/core';
import { claretTheme, defaultTheme, Theme } from './Theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private active: Theme = defaultTheme;
  private availableThemes: Theme[] = [defaultTheme, claretTheme];

  getAvailableThemes(): Theme[] {
    return this.availableThemes;
  }

  getActiveTheme(): Theme {
    return this.active;
  }

  isDefaultTheme(): boolean {
    return this.active.name === claretTheme.name;
  }

  isClaretTheme(): boolean {
    return this.active.name === claretTheme.name;
  }

  setDefaultTheme(): void {
    this.setActiveTheme(defaultTheme);
  }

  setClaretTheme(): void {
    this.setActiveTheme(claretTheme);
  }

  setActiveTheme(theme: Theme): void {
    this.active = theme;

    Object.keys(this.active.properties).forEach((property) => {
      document.documentElement.style.setProperty(
        property,
        this.active.properties[property]
      );
    });
  }
}
