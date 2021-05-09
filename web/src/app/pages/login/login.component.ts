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
import { TranslateService } from '@ngx-translate/core';
import { AppSettingsService } from 'src/app/services/core/app-settings.service';
import { AppNavigationService } from 'src/app/services/core/app-navigation.service';
import { LoginService } from 'src/app/services/data/login.service';
import { defaultLanguage } from 'src/app/translation/translation-config';
import { AppStateService } from 'src/app/services/core/app-state.service';
import { SettingsService } from 'src/app/services/data/settings.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Language } from 'src/app/model/Language';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  destroy$ = new Subject();
  loginForm: FormGroup;

  loginResult!: boolean;
  loginError!: boolean;

  loginInProgress = false;
  pageErrorMessage = '';

  languagesLoaded = false;
  languages: Language[];
  currentLanguage: Language;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private navigationService: AppNavigationService,
    private appSettingsService: AppSettingsService,
    private appStateService: AppStateService,
    private settingsService: SettingsService,
    private translate: TranslateService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.translate.use(this.appStateService.getOutLanguage());
    this.setupForm();

    this.settingsService
      .getLanguages()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (x) => {
          this.languages = x;
          this.languagesLoaded = x.length > 0;
          this.changeDetector.detectChanges();
        },
        error: () => {
          this.languagesLoaded = false;
          this.changeDetector.detectChanges();
        },
      });
  }

  onSubmit(): void {
    this.loginInProgress = true;
    this.changeDetector.detectChanges();

    this.loginService.login(this.email.value, this.password.value).subscribe({
      next: (x) => {
        if (this.resolveLoginStatus(x)) {
          this.appSettingsService.initSetttings().subscribe({
            next: () => {
              this.navigationService.navigateToHome();
            },
            error: () => {
              this.resolveError();
              this.loginInProgress = false;
              this.changeDetector.detectChanges();
            },
          });
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

  // LANGUAGE

  setOutLanguage(language: Language): void {
    this.currentLanguage = language;
    this.translate.use(language.abbreviation);
    this.appStateService.storeOutLanguage(language.abbreviation);
    this.changeDetector.detectChanges();
  }
}
