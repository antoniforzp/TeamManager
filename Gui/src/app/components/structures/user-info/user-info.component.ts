import {Component, OnInit} from '@angular/core';
import {AbstractComponent} from '../../AbstractComponent';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent extends AbstractComponent {

  constructor() {
    super();
  }
}
