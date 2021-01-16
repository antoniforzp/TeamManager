import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { multicast, tap } from 'rxjs/operators';
import { User } from 'src/app/model/User';
import { CustomValidators } from 'src/app/validators/Customvalidators';
import { HomeService } from '../home/home.service';
import { EditUserService } from './edit-user.service';

@Component({
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  currentUser$ = new Subject<User>();
  wrongUserPassword = false;

  editUserDataForm = this.fb.group({
    userName: ['', Validators.required],
    userSurname: ['', Validators.required],
    userEmail: [''],
  });

  editUserPasswordsFrom = this.fb.group({
    passwordUser: ['', Validators.required],
    passwordNew: [
      '',
      Validators.compose([
        Validators.required,
        CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
        Validators.minLength(8),
      ]),
    ],
    passwordRepeat: ['', Validators.compose([Validators.required])],
  });

  constructor(
    private fb: FormBuilder,
    private homeService: HomeService,
    private editUserService: EditUserService
  ) {
    this.currentUser$.subscribe((x) => {
      // Load user data
      this.editUserDataForm.patchValue({
        userName: x.name,
        userSurname: x.surname,
        userEmail: x.email,
      });

      // Load password validators
      this.editUserPasswordsFrom.setValidators([
        CustomValidators.passwordMatchValidator(
          this.passwordNew,
          this.passwordRepeat,
          {
            passwordDifferent: true,
          }
        ),
      ]);
      this.userEmail.disable();
    });
  }

  ngOnInit(): void {
    this.homeService.getCurrentUser().subscribe((x) => {
      this.currentUser$.next(x);
    });
  }

  editUserData(): void {
    this.editUserDataForm.markAllAsTouched();
    this.editUserService.editUserData(
      this.userName.value,
      this.userSurname.value
    );
  }

  editUserPasswords(): void {
    this.homeService
      .getCurrentUser()
      .pipe(
        tap(
          (x) =>
            (this.wrongUserPassword = !(x.password === this.passwordUser.value))
        )
      )
      .subscribe((x) => {
        this.editUserPasswordsFrom.markAllAsTouched();
        if (!this.wrongUserPassword) {
          this.editUserService.editUserPassword(this.passwordNew.value);
        }
      });
  }

  get userName(): any {
    return this.editUserDataForm.get('userName');
  }

  get userSurname(): any {
    return this.editUserDataForm.get('userSurname');
  }

  get userEmail(): any {
    return this.editUserDataForm.get('userEmail');
  }

  get passwordUser(): any {
    return this.editUserPasswordsFrom.get('passwordUser');
  }

  get passwordNew(): any {
    return this.editUserPasswordsFrom.get('passwordNew');
  }

  get passwordRepeat(): any {
    return this.editUserPasswordsFrom.get('passwordRepeat');
  }
}
