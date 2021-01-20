import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { hideWithTimeout, Result } from 'src/app/utils/Result';
import { CustomValidators } from 'src/app/validators/Customvalidators';

@Component({
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  result$ = new Subject<Result>();
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
  });

  constructor(private fb: FormBuilder, private userService: UserService) {
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

  fillTestingData(): void {
    this.addUserForm.patchValue({
      userName: 'Jan',
      userSurname: 'Kowalski',
      userEmail: 'jan@kowalski.com',
      password: 'Password1',
      passwordRepeat: 'Password1',
      teamName: '1 Drużyna Harcerzy "Test"',
      teamPatron: 'im. Szarych Szeregów',
    });
  }

  onSubmit(): void {
    this.userService
      .checkEmail(this.userEmail.value)
      .pipe(tap((mailExists) => (this.mailExists = mailExists)))
      .subscribe((mailExists) => {
        if (!mailExists) {
          this.userService
            .addUser({
              userId: -1,
              name: this.userName.value,
              surname: this.userSurname.value,
              password: this.password.value,
              email: this.userEmail.value,
            })
            .subscribe({
              next: (res) => {
                this.result$.next({
                  show: true,
                  result: res,
                });
                hideWithTimeout(this.result$);
              },
              error: () => {
                this.result$.next({
                  show: true,
                  result: false,
                });
                hideWithTimeout(this.result$);
              },
            });
        }
      });
  }

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
}
