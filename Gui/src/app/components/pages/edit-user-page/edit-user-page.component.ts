import {Component, OnInit} from '@angular/core';
import {AbstractComponent} from '../../AbstractComponent';

@Component({
  selector: 'app-edit-user-page',
  templateUrl: './edit-user-page.component.html',
  styleUrls: ['./edit-user-page.component.css']
})
export class EditUserPageComponent extends AbstractComponent {

  alert: string;
}
