import {Component} from '@angular/core';
import {AbstractComponent} from '../../AbstractComponent';
import {User} from "../../../model/user";
import {Team} from "../../../model/team";
import {UsersService} from "../../../services/users.service";

@Component({
  selector: 'app-add-user-page',
  templateUrl: './add-user-page.component.html',
  styleUrls: ['./add-user-page.component.css']
})
export class AddUserPageComponent extends AbstractComponent {

  public userModel: User = new User(0, '', '', '', '');
  public teamModel: Team = new Team(0, '', '');
  public passwordRepeat: string;

  public isPasswordMatched: boolean = false;
  public isPolicyChecked: boolean = false;
  public isEmailExists: boolean = false;

  public success: boolean = false;

  constructor(public usersService: UsersService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }

  validateEmail(value) {
    this.usersService.checkIfUserExists(value).subscribe(v => {
      this.isEmailExists = v;
    });
  }

  validatePasswords(value) {
    this.isPasswordMatched = (this.userModel.password == value && value != '');
  }

  submit(): void {
    this.usersService.addUser(this.userModel).subscribe(value => this.success);
    console.log(this.success);
  }
}
