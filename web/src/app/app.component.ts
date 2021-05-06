import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { defaultLanguage, languages } from './translation/translation-config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Menadżer Drużyny Harcerskiej';

  constructor(private translate: TranslateService) {
    translate.addLangs(languages);
    this.translate.setDefaultLang(defaultLanguage);
  }
}
