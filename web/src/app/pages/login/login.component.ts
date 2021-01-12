import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // Login form storing input credentials
  loginForm = this.fb.group({
    email: ['admin@admin.com', Validators.required],
    password: ['Password', Validators.required],
  });

  constructor(private fb: FormBuilder, private login: LoginService) {}

  get email(): string {
    return this.loginForm.get('email')?.value;
  }

  get password(): string {
    return this.loginForm.get('password')?.value;
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.login.login(this.email, this.password);
  }
}
