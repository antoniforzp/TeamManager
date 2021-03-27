import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { RegexPatterns } from '../utils/PatternsDefs';

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

  static atLeastOneCharValidator(error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null;
      }
      return new RegExp(RegexPatterns.AT_LEAST_ONE_CHAR).test(control.value)
        ? null
        : error;
    };
  }
}
