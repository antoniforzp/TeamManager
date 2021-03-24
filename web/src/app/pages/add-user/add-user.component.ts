import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ProgressModal } from 'src/app/modals/common/progress-modal/ProgressModal';
import { UserService } from 'src/app/services/user.service';
import { ResultOld } from 'src/app/utils/Result';
import { CustomValidators } from 'src/app/validators/Customvalidators';

@Component({
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  result$ = new Subject<ResultOld>();
  mailExists = false;
  addUserForm = this.fb.group({
    userName: ['', Validators.required],
    userSurname: ['', Validators.required],
    userEmail: [
      '',
      [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
      ],
    ],
    password: [
      '',
      Validators.compose([
        Validators.required,
        CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
      ]),
    ],
    passwordRepeat: ['', Validators.compose([Validators.required])],
    declaration: [null, [Validators.required, Validators.requiredTrue]],
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private dialog: MatDialog
  ) {
    this.addUserForm.setValidators(
      CustomValidators.passwordMatchValidator(
        this.password,
        this.passwordRepeat,
        {
          passwordDifferent: true,
        }
      )
    );
  }

  ngOnInit(): void {}

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

  // FORMS

  get userName(): any {
    return this.addUserForm.get('userName');
  }

  get userSurname(): any {
    return this.addUserForm.get('userSurname');
  }

  get userEmail(): any {
    return this.addUserForm.get('userEmail');
  }

  get password(): any {
    return this.addUserForm.get('password');
  }

  get passwordRepeat(): any {
    return this.addUserForm.get('passwordRepeat');
  }

  get declaration(): any {
    return this.addUserForm.get('declaration');
  }
}
