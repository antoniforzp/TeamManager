import {Component, OnInit} from '@angular/core';
import {AbstractComponent} from '../../AbstractComponent';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent extends AbstractComponent {

  constructor() {
    super();
  }

  navigate(url: string): void {
  }

}
