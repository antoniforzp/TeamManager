import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Team } from 'src/app/model/team';
import { User } from 'src/app/model/user';
import { TeamsService } from 'src/app/services/teams.service';
import { UsersService } from 'src/app/services/users.service';
import { AbstractComponent } from '../../AbstractComponent';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent extends AbstractComponent implements OnInit {
  public currUserS: Observable<User>;
  public currTeamS: Observable<Team>;
  public currUserTeamsS: Observable<Team[]>;

  constructor(
    private usersService: UsersService,
    private teamsService: TeamsService
  ) {
    super();
  }

  ngOnInit(): void {
    this.currUserS = this.usersService.getCurrentUser().pipe(tap(console.log));
    this.currTeamS = this.teamsService.getCurrentTeam().pipe(tap(console.log));
    this.currUserTeamsS = this.usersService
      .getUsersTeams()
      .pipe(tap(console.log));
  }
}
