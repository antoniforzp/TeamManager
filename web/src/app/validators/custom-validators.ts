import {
  AbstractControl,
  FormGroup,
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
    form: FormGroup,
    error: ValidationErrors
  ): ValidatorFn {
    return (): { [key: string]: any } | null => {
      return form.get('password')?.value === form.get('passwordRepeat')?.value
        ? null
        : error;
    };
  }
}
