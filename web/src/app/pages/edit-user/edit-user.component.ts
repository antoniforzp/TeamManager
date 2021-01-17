import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Team } from 'src/app/model/Team';
import { User } from 'src/app/model/User';
import { hideWithTimeout, Result } from 'src/app/utils/Result';
import { CustomValidators } from 'src/app/validators/Customvalidators';
import { HomeService } from '../home/home.service';
import { EditUserService } from './edit-user.service';

interface TeamForm {
  teamId: number;
  formGroup: FormGroup;
  result$: Subject<Result>;
}

@Component({
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  pageLoaded$ = new Subject<boolean>();
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

  editTeamsForms: TeamForm[] = [];

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

    // Load user teams and create custom array of control forms
    this.userTeams$.subscribe((x) => {
      x.forEach((t) => {
        this.editTeamsForms.push({
          teamId: t.teamId,
          result$: new Subject<Result>(),
          formGroup: this.fb.group({
            teamId: [t.teamId],
            teamName: [t.name, Validators.required],
            teamPatron: [t.patron, Validators.required],
          }),
        });
      });
    });
  }

  ngOnInit(): void {
    forkJoin({
      user: this.homeService.getCurrentUser(),
      teams: this.editUserService.getUserTeams(),
    }).subscribe((x) => {
      this.currentUser$.next(x.user);
      this.userTeams$.next(x.teams);

      this.pageLoaded$.next(true);
    });
  }

  editUserData(): void {
    this.editUserDataForm.markAllAsTouched();
    this.homeService.getCurrentUser().subscribe((x) =>
      this.editUserService
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
    this.homeService
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
          this.homeService.getCurrentUser().subscribe((x) => {
            this.editUserService
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
    this.editUserService
      .getUserTeams()
      .subscribe((x) => this.userTeams$.next(x));
  }

  editTeam(
    teamId: number,
    teamName: string,
    teamPatron: string,
    result: Subject<Result>
  ): void {
    console.log({
      teamId,
      teamName,
      teamPatron,
    });
    this.editUserService
      .editTeam(teamId, { teamId: -1, name: teamName, patron: teamPatron })
      .subscribe({
        next: (res) => {
          result.next({ show: true, result: res });
          hideWithTimeout(result);
        },
        error: () => {
          result.next({ show: true, result: false });
          hideWithTimeout(result);
        },
      });
  }

  deleteTeam(teamId: number, result: Subject<Result>): void {
    this.editUserService.deleteTeam(teamId).subscribe({
      next: (res) => {
        result.next({ show: true, result: res });
        hideWithTimeout(result);
      },
      error: () => {
        result.next({ show: true, result: false });
        hideWithTimeout(result);
      },
    });
    this.refreshTeamsList();
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

  teamGroup(index: number): FormGroup {
    return this.editTeamsForms[index].formGroup;
  }
}
