import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { tap } from 'rxjs/operators';
import { CustomValidators } from 'src/app/validators/custom-validators';
import { runInThisContext } from 'vm';
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
      .pipe(tap((x) => (this.mailExists = x)))
      .subscribe((x) => {
        if (!x) {
          this.addUserService.addUser({
            name: this.userName.value,
            surname: this.userName.value,
            password: this.userName.value,
            email: this.userName.value,
          }).subscribe(console.log);
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
