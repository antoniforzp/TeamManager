import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppStateService } from './services/core/app-state.service';
import { defaultLanguage, languages } from './translation/translation-config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  $destroy = new Subject();

  title = 'Menadżer Drużyny Harcerskiej';

  constructor(
    private translate: TranslateService,
    private router: Router,
    private appStateSerivce: AppStateService
  ) {
    this.translate.addLangs(languages);

    // Keep translation on refresh
    this.router.events.pipe(takeUntil(this.$destroy)).subscribe({
      next: () => {
        const lang = this.appStateSerivce.getLanguage();
        if (lang) {
          this.translate.use(lang);
        }
      },
    });
  }

  ngOnInit(): void {
    this.translate.setDefaultLang(defaultLanguage);
  }

  ngOnDestroy(): void {
    this.$destroy.next();
  }
}
