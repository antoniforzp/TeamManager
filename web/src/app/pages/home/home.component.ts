import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Team } from 'src/app/model/Team';
import { User } from 'src/app/model/User';
import { HomeService } from './home.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  currentUser$ = new Subject<User>();
  currentTeam$ = new Subject<Team>();
  availableTeams$ = new Subject<Team[]>();
  allTeams$ = new Subject<Team[]>();

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    // Get current user
    this.homeService
      .getCurrentUser()
      .subscribe((x) => this.currentUser$.next(x));

    // Get current team
    this.homeService.getCurrentTeam().subscribe((x) => {
      // Fetch available teams (all - current)
      this.currentTeam$.next(x);
      this.homeService
        .getCurrentUserTeams()
        .subscribe((t) =>
          this.availableTeams$.next(t.filter((k) => k.teamId !== x.teamId))
        );
    });

    // Get all teams
    this.homeService
      .getCurrentUserTeams()
      .subscribe((x) => this.allTeams$.next(x));
  }

  setCurrentTeam(newTeam: Team): void {
    this.homeService.setCurrentTeam(newTeam).subscribe({
      next: (x) => {
        if (x) {
          this.currentTeam$.next(newTeam);
        }
        // Update available teams
        this.homeService
          .getCurrentUserTeams()
          .subscribe((t) =>
            this.availableTeams$.next(
              t.filter((k) => k.teamId !== newTeam.teamId)
            )
          );
      },
      error: () => {},
    });
  }
}
