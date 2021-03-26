import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { Team } from 'src/app/model/Team';
import { User } from 'src/app/model/User';
import { CoreService } from '../../services/core.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {
  pageLoaded = false;
  destroy$ = new Subject();

  // Page data
  currentUser!: User;
  currentTeam!: Team;
  allTeams = [] as Team[];
  selectableTeams = [] as Team[];

  noTeams = true;

  constructor(
    private coreService: CoreService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    forkJoin({
      user: this.coreService.getCurrentUser(),
      team: this.coreService.getCurrentTeam(),
      userTeams: this.coreService.getCurrentUserTeams(),
    })
      .pipe(
        takeUntil(this.destroy$),
        tap((x) => {
          if (!x.team.patron || x.team.patron === '') {
            x.team.patron = ' ';
          }
        })
      )
      .subscribe({
        next: (result) => {
          this.currentUser = result.user;
          this.currentTeam = result.team;
          this.allTeams = result.userTeams;
          this.selectableTeams = result.userTeams.filter(
            (team) => team.teamId !== this.currentTeam.teamId
          );

          this.noTeams = this.allTeams.length <= 0;

          this.pageLoaded = true;
          this.changeDetector.detectChanges();
        },
        error: () => {},
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  setCurrentTeam(newTeam: Team): void {
    this.pageLoaded = false;
    this.changeDetector.detectChanges();

    this.coreService.setCurrentTeam(newTeam.teamId).subscribe({
      next: () => {
        this.currentTeam = newTeam;

        // Update available teams
        this.selectableTeams = this.allTeams.filter(
          (team) => team.teamId !== this.currentTeam.teamId
        );

        this.pageLoaded = true;
        this.changeDetector.detectChanges();
      },
      error: () => {},
    });
  }
}
