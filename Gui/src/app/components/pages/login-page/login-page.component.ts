import {Component, OnInit} from '@angular/core';
import {PagesUrls} from '../../../utils/PagesUrls';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  PagesUrlsLocal = PagesUrls;

  constructor() {
  }

  ngOnInit(): void {
  }
}
