import { Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { SettingsService } from './services/data/settings.service';
import { defaultLanguage, languages } from './translation/translation-config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnDestroy {
  $destroy = new Subject();

  title = 'Menadżer Drużyny Harcerskiej';

  constructor(
    private translate: TranslateService,
    private router: Router,
    private settingsSerivce: SettingsService
  ) {
    this.translate.addLangs(languages);

    // Keep translation on refresh

    combineLatest([this.settingsSerivce.getSettings(), this.router.events])
      .pipe(takeUntil(this.$destroy))
      .subscribe({
        next: ([settings]) => {
          this.translate.setDefaultLang(defaultLanguage);
          this.translate.use(settings.language.abbreviation);
        },
      });
  }

  ngOnDestroy(): void {
    this.$destroy.next();
  }
}
