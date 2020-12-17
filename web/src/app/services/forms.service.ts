import {Injectable} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  /**
   * Function checking the valid state of form control
   * @param form - form group (parent)
   * @param field - name of form control of form group
   */
  public isFieldValid(form: FormGroup, field: string) {
    return !form.get(field)?.valid && form.get(field)?.touched;
  }

  /**
   *
   * @param form
   */
  public clearAllForms(form: FormGroup) {
    Object.keys(form.controls).forEach(field => {

      const control = form.get(field);
      if (control instanceof FormControl) {
        control.markAsUntouched({onlySelf: true});

      } else if (control instanceof FormGroup) {
        this.clearAllForms(control);
      }
    });
  }

  /**
   * Function validating all form fields. Recursively searches for the all fields
   * and mark them as 'touched' then checks whether they are valid
   * @param form - form group needed to be validated
   */
  public validateAllFormFields(form: FormGroup) {
    Object.keys(form.controls).forEach(field => {

      const control = form.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});

      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  /**
   * Funtion dynamically passing css class to inputs provided input is invalid
   * @param form - the parent of the form control (form group)
   * @param field - the name of the form control linked to the html input
   * @param submit - controlling flag on submit hit
   */
  public displayFieldCssCredentials(form: FormGroup, field: string, submit: boolean) {
    return submit ? {
      'is-invalid': this.isFieldValid(form, field)
    } : {};
  }
}
