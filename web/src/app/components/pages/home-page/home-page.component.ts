import {Component, OnInit} from '@angular/core';
import {AbstractComponent} from '../../AbstractComponent';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent extends AbstractComponent {

  constructor() {
    super();
  }
}
