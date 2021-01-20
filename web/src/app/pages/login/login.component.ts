import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LoginService } from '../../services/login.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginResult: boolean | undefined = undefined;
  loginForm = this.fb.group({
    email: ['admin@admin.com', Validators.required],
    password: ['Password1', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private login: LoginService,
    private router: Router
  ) {}

  get email(): string {
    return this.loginForm.get('email')?.value;
  }

  get password(): string {
    return this.loginForm.get('password')?.value;
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.login.login(this.email, this.password).subscribe((x) => {
      this.loginResult = x;
      if (x) {
        this.router.navigateByUrl('/home');
      }
    });
  }
}
