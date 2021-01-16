import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ProgressModalComponent } from 'src/app/global/progress-modal/progress-modal.component';
import { SuccessModalComponent } from 'src/app/global/success-modal/success-modal.component';
import { CustomValidators } from 'src/app/validators/custom-validators';
import { AddUserService } from './add-user.service';

@Component({
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
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
        Validators.minLength(8),
      ]),
    ],
    passwordRepeat: ['', Validators.compose([Validators.required])],
    teamName: ['', Validators.required],
    teamPatron: [''],
  });

  @ViewChild(SuccessModalComponent)
  private successModal!: SuccessModalComponent;

  @ViewChild(ProgressModalComponent)
  private progressModal!: ProgressModalComponent;

  constructor(private fb: FormBuilder, private addUserService: AddUserService) {
    this.addUserForm.setValidators(
      CustomValidators.passwordMatchValidator(this.addUserForm, {
        passwordDifferent: true,
      })
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
    this.addUserService
      .checkEmail(this.userEmail.value)
      .pipe(tap((mailExists) => (this.mailExists = mailExists)))
      .subscribe((mailExists) => {
        if (mailExists) {
          console.log('user email exists in database!');
        } else {
          this.progressModal.open();
          this.addUserService
            .addUser({
              userId: -1,
              name: this.userName.value,
              surname: this.userSurname.value,
              password: this.password.value,
              email: this.userEmail.value,
            })
            .subscribe((result) => {
              if (result) {
                this.progressModal.close();
                this.successModal.open('Udało sie');
              }
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

  get teamName(): any {
    return this.addUserForm.get('teamName');
  }

  get teamPatron(): any {
    return this.addUserForm.get('teamPatron');
  }
}
