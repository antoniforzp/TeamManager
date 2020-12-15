import {Component} from '@angular/core';
import {AbstractComponent} from "../../AbstractComponent";
import {NavigationService} from "../../../services/navigation.service";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FormsService} from "../../../services/forms.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent extends AbstractComponent {

  submitted: boolean = false;

  credentialsForm = this.formBuilder.group({
    userEmail: ['', [Validators.required]],
    userPassword: ['', [Validators.required, this.checkPassword]],
  });

  constructor(public nav: NavigationService,
              public formBuilder: FormBuilder,
              public forms: FormsService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();

    //TODO: to remove (for testing purposes)
    this.credentialsForm.patchValue({
      userEmail: 'admin@admin.com',
      userPassword: 'admin',
    });
  }

  checkPassword(control: AbstractControl): { [key: string]: any } | null {
    let matches = (control.value == 'admin');
    return matches ? null : {'password': 'not-matching'};
  }

  submit(form: FormGroup) {
    this.submitted = true;
    if (form.valid) {
      console.log('form submitted');
    } else {
      this.forms.validateAllFormFields(form);
      console.log('form invalid');
    }
  }
}
