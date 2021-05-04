import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NavigationService } from 'src/app/services/core/navigation.service';
import { LoginService } from '../../services/login.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  loginResult!: boolean;
  loginError!: boolean;

  loginInProgress = false;
  pageErrorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private navigationService: NavigationService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.setupForm();
  }

  onSubmit(): void {
    this.loginInProgress = true;
    this.changeDetector.detectChanges();

    this.loginService.login(this.email.value, this.password.value).subscribe({
      next: (x) => {
        if (this.resolveLoginStatus(x)) {
          this.router.navigateByUrl('/home');
        }
        this.loginInProgress = false;
        this.changeDetector.detectChanges();
      },
      error: () => {
        this.resolveError();
        this.loginInProgress = false;
        this.changeDetector.detectChanges();
      },
    });
  }

  resolveLoginStatus(result: boolean): boolean {
    this.loginResult = result;
    this.pageErrorMessage = this.loginResult
      ? ''
      : 'Nieprawidłowe dane logowania';
    return result;
  }

  resolveError(): void {
    this.loginError = true;
    this.pageErrorMessage = 'Błąd połączenia z serwerem';
  }

  // SETTING UP FORM

  setupForm(): void {
    this.loginForm = this.fb.group({
      email: ['admin@admin.com', Validators.required],
      password: ['Admin1', Validators.required],
    });
  }

  // FROMS

  get email(): AbstractControl {
    return this.loginForm.get('email');
  }

  get password(): AbstractControl {
    return this.loginForm.get('password');
  }

  // NAVIGATION

  navigateToAddUser(): void {
    this.navigationService.navigateToAddUser();
  }
}
