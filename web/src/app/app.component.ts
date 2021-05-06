import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Menadżer Drużyny Harcerskiej';

  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'pl']);
    this.translate.setDefaultLang('pl');
  }
}
