import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Team } from 'src/app/model/Team';
import { User } from 'src/app/model/User';
import { CoreService } from '../../services/core.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  currentUser$ = new Subject<User>();
  currentTeam$ = new Subject<Team>();
  availableTeams$ = new Subject<Team[]>();
  allTeams$ = new Subject<Team[]>();

  constructor(private coreService: CoreService) {}

  ngOnInit(): void {
    // Get current user
    this.coreService
      .getCurrentUser()
      .subscribe((x) => this.currentUser$.next(x));

    // Get current team
    this.coreService.getCurrentTeam().subscribe((x) => {
      // Fetch available teams (all - current)
      this.currentTeam$.next(x);
      this.coreService
        .getCurrentUserTeams()
        .subscribe((t) =>
          this.availableTeams$.next(t.filter((k) => k.teamId !== x.teamId))
        );
    });

    // Get all teams
    this.coreService
      .getCurrentUserTeams()
      .subscribe((x) => this.allTeams$.next(x));
  }

  setCurrentTeam(newTeam: Team): void {
    this.coreService.setCurrentTeam(newTeam.teamId).subscribe({
      next: (x) => {
        if (x) {
          this.currentTeam$.next(newTeam);
        }
        // Update available teams
        this.coreService
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
