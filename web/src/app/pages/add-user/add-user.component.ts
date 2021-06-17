import { HttpErrorResponse } from '@angular/common/http';
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
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { tap } from 'rxjs/operators';
import { ProgressModal } from 'src/app/modals/common/progress-modal/ProgressModal';
import { AppNavigationService } from 'src/app/services/core/app-navigation.service';
import { AppStateService } from 'src/app/services/core/app-state.service';
import { UserService } from 'src/app/services/data/user.service';
import { AppRoutes } from 'src/app/shared/menu/Routes';
import { defaultLanguage } from 'src/app/translation/translation-config';
import { RegexPatterns } from 'src/app/utils/PatternsDefs';
import { Results } from 'src/app/utils/Result';
import { CustomValidators } from 'src/app/validators/Customvalidators';

@Component({
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddUserComponent implements OnInit {
  pageLoaded = false;
  pageError: HttpErrorResponse;

  AppRoutes = AppRoutes;

  mailExists = false;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private dialog: MatDialog,
    private translate: TranslateService,
    private appStateService: AppStateService,
    private navigationService: AppNavigationService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.translateView();
    this.setupForm();
    this.pageLoaded = true;
    this.changeDetector.detectChanges();
  }

  // TRANSLATION

  translateView(): void {
    const lang = this.appStateService.outLanguage;
    lang ? this.translate.use(lang) : this.translate.use(defaultLanguage);
  }

  // FUNCTIONALITIES

  addUser(): void {
    this.userService
      .checkUser(this.userEmail.value)
      .pipe(tap((mailExists) => (this.mailExists = mailExists)))
      .subscribe({
        next: (mailExists) => {
          if (!mailExists) {
            new ProgressModal(this.dialog)
              .open([
                {
                  request: this.userService.addUser(
                    this.userName.value,
                    this.userSurname.value,
                    this.password.value,
                    this.userEmail.value
                  ),
                  requestLabel: 'requests.delete-team',
                },
              ])
              .then((x) =>
                x.afterClosed().subscribe((result) => {
                  if (result === Results.SUCCESS) {
                    this.form.reset();
                    this.navigationService.navigateToLogin();
                  }
                })
              );
          }
          this.changeDetector.detectChanges();
        },
        error: (err) => this.handleError(err),
      });
  }

  handleError(error: HttpErrorResponse): void {
    this.pageLoaded = true;
    this.pageError = error;
    this.changeDetector.detectChanges();
  }

  // FORMS SETUP

  setupForm(): void {
    this.form = this.fb.group({
      userName: ['', Validators.required],
      userSurname: ['', Validators.required],
      userEmail: [
        '',
        [Validators.required, Validators.pattern(RegexPatterns.EMAIL)],
      ],
      password: [
        '',
        [
          Validators.required,
          CustomValidators.patternValidator(
            new RegExp(RegexPatterns.HAS_NUMBER),
            { hasNumber: true }
          ),
          CustomValidators.patternValidator(
            new RegExp(RegexPatterns.HAS_CAPITAL),
            { hasCapitalCase: true }
          ),
          CustomValidators.patternValidator(
            new RegExp(RegexPatterns.HAS_SMALL),
            {
              hasSmallCase: true,
            }
          ),
        ],
      ],
      passwordRepeat: ['', [Validators.required]],
      declaration: [null, [Validators.required, Validators.requiredTrue]],
    });

    this.form.setValidators(
      CustomValidators.passwordMatchValidator(
        this.password,
        this.passwordRepeat,
        {
          passwordDifferent: true,
        }
      )
    );
  }

  // FORMS

  get userName(): AbstractControl {
    return this.form.get('userName');
  }

  get userSurname(): AbstractControl {
    return this.form.get('userSurname');
  }

  get userEmail(): AbstractControl {
    return this.form.get('userEmail');
  }

  get password(): AbstractControl {
    return this.form.get('password');
  }

  get passwordRepeat(): AbstractControl {
    return this.form.get('passwordRepeat');
  }

  get declaration(): any {
    return this.form.get('declaration');
  }
}
