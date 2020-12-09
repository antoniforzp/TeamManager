import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AbstractComponent} from '../../AbstractComponent';

@Component({
  selector: 'app-add-user-page',
  templateUrl: './add-user-page.component.html',
  styleUrls: ['./add-user-page.component.css']
})
export class AddUserPageComponent extends AbstractComponent {

  constructor() {
    super();
  }

  onSubmit(f: NgForm): void {
    console.log(f);
  }
}
