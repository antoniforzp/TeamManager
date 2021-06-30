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
import { AppNavigationService } from 'src/app/services/core/app-navigation.service';
import { LoginService } from 'src/app/services/data/login.service';
import { AppStateService } from 'src/app/services/core/app-state.service';
import { SettingsService } from 'src/app/services/data/settings.service';
import { of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { defaultLanguage } from 'src/app/translation/translation-config';
import { HttpErrorResponse } from '@angular/common/http';
import { AppInitService } from 'src/app/services/core/app-init.service';
import { Language } from 'src/app/model/data/Language';
import { AuthenticationService } from 'src/app/web/auth/authentication.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  destroy$ = new Subject();
  loginForm: FormGroup;

  loginResult!: boolean;

  loginInProgress = false;
  pageError: string;

  languagesLoaded = false;
  languages: Language[];
  currentLanguageId: string;

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private navigationService: AppNavigationService,
    private appInit: AppInitService,
    private appStateService: AppStateService,
    private settingsService: SettingsService,
    private translate: TranslateService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.setupForm();
    this.translateView();

    this.currentLanguageId = this.appStateService.outLanguage;
    this.changeDetector.detectChanges();

    this.settingsService
      .getLanguagesNoUser()
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

  translateView(): void {
    const lang = this.appStateService.outLanguage;
    lang ? this.translate.use(lang) : this.translate.use(defaultLanguage);
  }

  onSubmit(): void {
    this.resetAlerts();
    this.progressStart();

    this.authenticationService
      .login(this.email.value, this.password.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (x) => {
          if (x.token && x.userId) {
            this.appInit.initCore(x.token, x.userId, x.teamId);
            this.initSettingsAndNavigate();
          } else {
            this.wrongCredentialsAlert();
            this.progressStop();
          }
        },
        error: (err) => this.resolveError(err),
      });
  }

  initSettingsAndNavigate(): void {
    const stream = this.currentLanguageId
      ? this.appInit.initLanguageFromLogin(this.appStateService.outLanguage)
      : of({});

    stream.subscribe({
      next: () => {
        this.appInit
          .initSettings()
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: () => {
              this.navigationService.navigateToHome();
              this.progressStop();
            },
            error: (err) => {
              this.resolveError(err);
            },
          });
      },
    });
  }

  // PAGE FLOW CONTROL

  private progressStart(): void {
    this.loginInProgress = true;
    this.changeDetector.detectChanges();
  }

  private progressStop(): void {
    this.loginInProgress = false;
    this.changeDetector.detectChanges();
  }

  // ALERTS

  private resetAlerts(): void {
    this.pageError = null;
  }

  private wrongCredentialsAlert(): void {
    this.pageError = 'errors.login-credentials';
  }

  private noServerConnection(): void {
    this.pageError = 'errors.communication-server';
  }

  private resolveError(err: HttpErrorResponse): void {
    if (err.status === 0 || (err.status > 500 && err.status < 599)) {
      this.noServerConnection();
    } else if (err.status === 409 || err.status === 403) {
      this.wrongCredentialsAlert();
    } else {
      this.pageError = err.message;
    }

    this.progressStop();
  }

  // SETTING UP FORM

  private setupForm(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // FORMS

  get email(): AbstractControl {
    return this.loginForm.get('email');
  }

  get password(): AbstractControl {
    return this.loginForm.get('password');
  }

  // NAVIGATION

  public navigateToAddUser(): void {
    this.navigationService.navigateToAddUser();
  }

  // LANGUAGE

  public setOutLanguage(language: Language): void {
    this.currentLanguageId = language.languageId;
    this.translate.use(language.languageId);
    this.appStateService.storeOutLanguage(language.languageId);
    this.changeDetector.detectChanges();
  }
}
