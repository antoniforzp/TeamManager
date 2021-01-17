import { Component, OnInit } from '@angular/core';
import { forkJoin, Subject } from 'rxjs';
import { Team } from 'src/app/model/Team';
import { User } from 'src/app/model/User';
import { HomeService } from './home.service';

interface PageData {
  currentUser: User;
  currentTeam: Team;
  hasTeams: boolean;
}
@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  pageData$ = new Subject<PageData>();

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    forkJoin({
      _currentUser: this.homeService.getCurrentUser(),
      _currentTeam: this.homeService.getCurrentTeam(),
      _userTeams: this.homeService.getCurrentUserTeamsNo(),
    }).subscribe((x) => {
      this.pageData$.next({
        currentUser: x._currentUser,
        currentTeam: x._currentTeam,
        hasTeams: x._userTeams > 0,
      });
    });
  }
}
