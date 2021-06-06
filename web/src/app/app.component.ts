import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppStateService } from './services/core/app-state.service';
import { AppThemeService } from './services/core/app-theme.service';
import { defaultLanguage, languages } from './translation/translation-config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  $destroy = new Subject();

  constructor(
    private translate: TranslateService,
    private titleService: Title,
    private router: Router,
    private appStateSerivce: AppStateService,
    private appThemeService: AppThemeService
  ) {
    this.initLanguage();
    this.translate.addLangs(languages);

    this.titleService.setTitle('Scout Team Manager');

    // Keep application state on refresh
    this.router.events.pipe(takeUntil(this.$destroy)).subscribe({
      next: (x) => {
        if (x instanceof NavigationEnd) {
          const lang = this.appStateSerivce.language;
          if (lang) {
            this.translate.use(lang);
          }

          const themeId = this.appStateSerivce.theme;
          if (themeId) {
            this.appThemeService.setThemeById(themeId);
          }
        }
      },
    });
  }

  ngOnInit(): void {
    this.initLanguage();
  }

  ngOnDestroy(): void {
    this.$destroy.next();
  }

  private initLanguage(): void {
    this.translate.setDefaultLang(defaultLanguage);
    this.translate.use(defaultLanguage);
  }
}
