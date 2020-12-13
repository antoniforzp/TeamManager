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
    userEmail: ['']
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

  ngOnInit() {
    super.ngOnInit();

    this.credentialsForm.patchValue({
      userName: 'Antoni',
      userSurname: 'Forzpańczyk',
      userEmail: 'antoni@antoni.com'
    });
  }

  private static isFieldValid(form: FormGroup, field: string) {
    return !form.get(field)?.valid && form.get(field)?.touched;
  }

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
