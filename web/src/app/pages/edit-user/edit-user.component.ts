import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { forkJoin, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Team } from 'src/app/model/Team';
import { User } from 'src/app/model/User';
import { hideWithTimeout, Result } from 'src/app/utils/Result';
import { CustomValidators } from 'src/app/validators/Customvalidators';
import { CoreService } from '../../services/core.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  currentUser$ = new Subject<User>();
  userTeams$ = new Subject<Team[]>();
  wrongUserPassword = false;

  // Server feedbacks
  editUserResult$ = new Subject<Result>();
  editPasswordResult$ = new Subject<Result>();

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
      ]),
    ],
    passwordRepeat: ['', Validators.compose([Validators.required])],
  });

  constructor(
    private fb: FormBuilder,
    private coreService: CoreService,
    private userService: UserService
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
    forkJoin({
      user: this.coreService.getCurrentUser(),
      teams: this.userService.getUserTeams(),
    }).subscribe((x) => {
      this.currentUser$.next(x.user);
      this.userTeams$.next(x.teams);
    });
  }

  editUserData(): void {
    this.editUserDataForm.markAllAsTouched();
    this.coreService.getCurrentUser().subscribe((x) =>
      this.userService
        .editUserData({
          userId: x.userId,
          name: this.userName.value,
          surname: this.userSurname.value,
          password: x.password,
          email: this.userEmail.value,
        })
        .subscribe({
          next: (res) => {
            this.editUserResult$.next({
              show: true,
              result: res,
            });
            hideWithTimeout(this.editUserResult$);
          },
          error: () => {
            this.editUserResult$.next({
              show: true,
              result: false,
            });
            hideWithTimeout(this.editUserResult$);
          },
        })
    );
  }

  editUserPasswords(): void {
    this.coreService
      .getCurrentUser()
      .pipe(
        tap(
          (x) =>
            (this.wrongUserPassword = !(x.password === this.passwordUser.value))
        )
      )
      .subscribe(() => {
        this.editUserPasswordsFrom.markAllAsTouched();
        if (!this.wrongUserPassword) {
          this.coreService.getCurrentUser().subscribe((x) => {
            this.userService
              .editUserData({
                userId: x.userId,
                name: x.name,
                surname: x.surname,
                password: this.passwordNew.value,
                email: x.email,
              })
              .subscribe({
                next: (res) => {
                  this.editPasswordResult$.next({
                    show: true,
                    result: res,
                  });
                  hideWithTimeout(this.editPasswordResult$);
                },
                error: () => {
                  this.editPasswordResult$.next({
                    show: true,
                    result: false,
                  });
                  hideWithTimeout(this.editPasswordResult$);
                },
              });
          });
        }
      });
  }

  refreshTeamsList(): void {
    this.userService.getUserTeams().subscribe((x) => this.userTeams$.next(x));
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
