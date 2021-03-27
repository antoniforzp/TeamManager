import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ProgressModal } from 'src/app/modals/common/progress-modal/ProgressModal';
import { UserService } from 'src/app/services/user.service';
import { RegexPatterns } from 'src/app/utils/PatternsDefs';
import { ResultOld } from 'src/app/utils/Result';
import { CustomValidators } from 'src/app/validators/Customvalidators';

@Component({
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  result$ = new Subject<ResultOld>();
  mailExists = false;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.setupForm();
  }

  onSubmit(): void {
    this.userService
      .checkUser(this.userEmail.value)
      .pipe(tap((mailExists) => (this.mailExists = mailExists)))
      .subscribe((mailExists) => {
        if (!mailExists) {
          new ProgressModal(this.dialog).open(
            this.userService.addUser(
              this.userName.value,
              this.userSurname.value,
              this.password.value,
              this.userEmail.value
            ),
            {
              successMessage:
                'Udało się stworzyć konto. Zaloguj się do aplikacji.',
              failureMessage:
                'Nie udało się zaktualizować dane harcerza. Sprawdź wszystkie dane.',
            }
          );
        }
      });
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
