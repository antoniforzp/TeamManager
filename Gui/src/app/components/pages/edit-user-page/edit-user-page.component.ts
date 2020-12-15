import {Component} from '@angular/core';
import {AbstractComponent} from '../../AbstractComponent';
import {FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective} from '@angular/forms';

@Component({
  selector: 'app-edit-user-page',
  templateUrl: './edit-user-page.component.html',
  styleUrls: ['./edit-user-page.component.css']
})
export class EditUserPageComponent extends AbstractComponent {

  credentialsForm = this.formBuilder.group({
    userName: ['', [Validators.required]],
    userSurname: ['', Validators.required],
    userEmail: [{value: '', disabled: true}]
  });

  passwordsFrom = this.formBuilder.group({
    userOldPassword: [''],
    userNewPassword: [''],
    userNewPasswordRepeat: ['']
  });

  credentialsSubmit: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    super();
  }

  /**
   * Getters of every form control
   */

  get userName() {
    return this.credentialsForm.get('userName');
  }

  get userSurname() {
    return this.credentialsForm.get('userSurname');
  }

  get userEmail() {
    return this.credentialsForm.get('userEmail');
  }

  get userOldPassword() {
    return this.passwordsFrom.get('userOldPassword');
  }

  get userNewPassword() {
    return this.passwordsFrom.get('userNewPassword');
  }

  get userNewPasswordRepeat() {
    return this.passwordsFrom.get('userNewPasswordRepeat');
  }

  
  ngOnInit() {
    super.ngOnInit();

    /**
     * Loading initial data to be edited in forms
     */
    this.credentialsForm.patchValue({
      userName: 'Antoni',
      userSurname: 'Forzpańczyk',
      userEmail: 'antoni@antoni.com'
    });
  }

  /**
   * Function checking the valid state of form control
   * @param form - form group (parent)
   * @param field - name of form control of form group
   */
  private static isFieldValid(form: FormGroup, field: string) {
    return !form.get(field)?.valid && form.get(field)?.touched;
  }

  /**
   * Function validating all form fields. Recursively searches for the all fields
   * and mark them as 'touched' then checks whether they are valid
   * @param form - form group needed to be validated
   */
  private validateAllFormFields(form: FormGroup) {
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
   */
  public displayFieldCssCredentials(form: FormGroup, field: string) {
    return this.credentialsSubmit ? {
      'is-invalid': EditUserPageComponent.isFieldValid(form, field)
    } : {};
  }

  public onSubmit(form: FormGroup) {
    this.credentialsSubmit = true;
    if (form.valid) {
      console.log('form submitted');
    } else {
      this.validateAllFormFields(form);
      console.log('form invalid');
    }
  }
}
