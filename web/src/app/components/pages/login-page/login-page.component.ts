import {Component, ViewChild} from '@angular/core';
import {AbstractComponent} from "../../AbstractComponent";
import {NavigationService} from "../../../services/navigation.service";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FormsService} from "../../../services/forms.service";
import {UsersService} from "../../../services/users.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent extends AbstractComponent {

  submitted: boolean = false;
  valid: boolean = true;

  credentialsForm = this.formBuilder.group({
    userEmail: ['', [Validators.required]],
    userPassword: ['', [Validators.required, this.checkPassword]],
  });

  constructor(public nav: NavigationService,
              public formBuilder: FormBuilder,
              public forms: FormsService,
              public user: UsersService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();

    this.credentialsForm.patchValue({
      userEmail: 'admin@admin.com',
      userPassword: 'admin',
    });
  }

  checkPassword(control: AbstractControl): { [key: string]: any } | null {
    let matches = (control.value == 'admin');
    return matches ? null : {'password': 'not-matching'};
  }

  onNewInput(form: FormGroup) {
    this.forms.clearAllForms(form);
  }

  onSubmit(form: FormGroup) {
    this.submitted = true;
    this.valid = form.valid;

    if (this.valid) {

      //TODO: sprawdzić czy hasło się zgadza z podanym mailem (if true przejść do /home)
      //this.user.

    } else {
      this.forms.validateAllFormFields(form);
      console.log('form invalid');
    }
  }
}
