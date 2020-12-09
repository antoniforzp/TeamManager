import {Component, OnInit} from '@angular/core';
import {PagesUrls} from '../../../utils/PagesUrls';
import {LoginServiceService} from '../../../services/login-service.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  PagesUrlsLocal = PagesUrls;

  constructor(private loginService: LoginServiceService) {
  }

  ngOnInit(): void {
  }

  public login(): void {
    this.loginService.login();
  }

}
