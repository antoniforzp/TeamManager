import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export class CustomValidators {
  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null;
      }
      return regex.test(control.value) ? null : error;
    };
  }

  static passwordMatchValidator(
    password: AbstractControl,
    passwordRepeat: AbstractControl,
    error: ValidationErrors
  ): ValidatorFn {
    return (): { [key: string]: any } | null => {
      return password?.value === passwordRepeat?.value ? null : error;
    };
  }

  static userPasswordMatchValidator(
    userPassword: string,
    newPassword: AbstractControl,
    error: ValidationErrors
  ): ValidatorFn {
    return (): { [key: string]: any } | null => {
      return newPassword?.value === userPassword ? null : error;
    };
  }
}
