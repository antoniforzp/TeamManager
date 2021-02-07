import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { LoginService } from '../../services/login.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginResult: boolean | undefined = undefined;
  loginForm = this.fb.group({
    email: ['admin@admin.com', Validators.required],
    password: ['Password1', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {}

  get email(): string {
    return this.loginForm.get('email')?.value;
  }

  get password(): string {
    return this.loginForm.get('password')?.value;
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.loginService
      .login(this.email, this.password)
      .pipe(tap((x) => (this.loginResult = x)))
      .subscribe((x) => {
        if (x) {
          this.router.navigateByUrl('/home');
        }
      });
  }
}
