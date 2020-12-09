import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {PagesUrls} from './utils/PagesUrls';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  pagesUrlsLocal = PagesUrls;

  constructor(public router: Router) {
  }
}
