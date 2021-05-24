import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/model/User';
import { CustomValidators } from 'src/app/validators/Customvalidators';
import { CoreService } from '../../services/data/core.service';
import { RegexPatterns } from 'src/app/utils/PatternsDefs';
import { HttpErrorResponse } from '@angular/common/http';
import { ProgressModal } from 'src/app/modals/common/progress-modal/ProgressModal';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/data/user.service';
import { AppRoutes } from 'src/app/shared/menu/Routes';

@Component({
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditUserComponent implements OnInit, OnDestroy {
  AppRoutes = AppRoutes;
  destroy$ = new Subject();

  pageLoaded = false;
  pageError: HttpErrorResponse;
  validCurrentPassword: boolean;

  credentialsForm: FormGroup;
  passwordsForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private coreService: CoreService,
    private userService: UserService,
    private changeDetector: ChangeDetectorRef,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.setupCredentialsForm();
    this.setupPasswordsForm();
    this.loadPageData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  // DATA LOADING

  loadPageData(): void {
    this.pageLoaded = false;

    forkJoin({
      user: this.coreService.getCurrentUser(),
      teams: this.userService.getUserTeams(),
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (x) => {
          this.patchUserData(x.user);

          this.pageLoaded = true;
          this.changeDetector.detectChanges();
        },
        error: (error) => {
          this.pageLoaded = true;
          this.pageError = error;
          this.changeDetector.detectChanges();
        },
      });
  }

  patchUserData(user: User): void {
    this.credentialsForm.patchValue({
      userName: user.name,
      userSurname: user.surname,
      userEmail: user.email,
    });
  }

  // FUNCTIONALITIES

  editCredentials(): void {
    this.coreService
      .getCurrentUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (currUserData) => {
          new ProgressModal(this.dialog).open([
            {
              request: this.userService.editUserData(
                currUserData.userId,
                this.userName.value,
                this.userSurname.value,
                currUserData.password,
                currUserData.email
              ),
              requestLabel: 'Edycja danych użytkownika',
            },
          ]);
        },
        error: () => {
          // TODO: Dorobić modala z errorem
        },
      });
  }

  editPassword(): void {
    this.coreService
      .getCurrentUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (currUserData) => {
          // Check password
          this.validCurrentPassword =
            currUserData.password === this.passwordCurrent.value;

          if (this.validCurrentPassword) {
            new ProgressModal(this.dialog)
              .open([
                {
                  request: this.userService.editUserData(
                    currUserData.userId,
                    currUserData.name,
                    currUserData.surname,
                    this.passwordNew.value,
                    currUserData.email
                  ),
                  requestLabel: 'Edycja hasła',
                },
              ])
              .then((x) =>
                x.afterClosed().subscribe(() => this.clearPasswordsForms())
              );
          }
        },
        error: () => {
          // TODO: Dorobić modala z errorem
        },
      });
  }

  // FORM STEUP

  setupCredentialsForm(): void {
    this.credentialsForm = this.fb.group({
      userName: ['', [Validators.required]],
      userSurname: ['', [Validators.required]],
      userEmail: ['', [Validators.required]],
    });
    this.userEmail.disable();
  }

  setupPasswordsForm(): void {
    this.passwordsForm = this.fb.group({
      passwordCurrent: ['', [Validators.required]],
      passwordNew: [
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
            { hasSmallCase: true }
          ),
        ],
      ],
      passwordRepeat: [''],
    });

    this.passwordsForm.setValidators([
      CustomValidators.passwordMatchValidator(
        this.passwordNew,
        this.passwordRepeat,
        {
          passwordDifferent: true,
        }
      ),
    ]);
  }

  clearPasswordsForms(): void {
    this.passwordsForm.patchValue({
      passwordCurrent: '',
      passwordNew: '',
      passwordRepeat: '',
    });
    this.validCurrentPassword = null;
  }

  // FORMS

  get userName(): AbstractControl {
    return this.credentialsForm.get('userName');
  }

  get userSurname(): AbstractControl {
    return this.credentialsForm.get('userSurname');
  }

  get userEmail(): AbstractControl {
    return this.credentialsForm.get('userEmail');
  }

  get passwordCurrent(): AbstractControl {
    return this.passwordsForm.get('passwordCurrent');
  }

  get passwordNew(): AbstractControl {
    return this.passwordsForm.get('passwordNew');
  }

  get passwordRepeat(): AbstractControl {
    return this.passwordsForm.get('passwordRepeat');
  }
}
