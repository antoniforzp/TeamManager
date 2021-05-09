import { HttpErrorResponse } from '@angular/common/http';
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
import { AppNavigationService } from 'src/app/services/core/app-navigation.service';
import { checkIfBlank } from 'src/app/utils/FormsUtils';
import { CoreService } from '../../services/data/core.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();

  pageLoaded = false;
  pageError: HttpErrorResponse;

  noPatron: boolean;

  // Page data
  currentUser!: User;
  currentTeam!: Team;
  allTeams = [] as Team[];
  selectableTeams = [] as Team[];

  noTeams = true;

  constructor(
    private coreService: CoreService,
    private navigationService: AppNavigationService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  handleError(error: HttpErrorResponse): void {
    this.pageLoaded = true;
    this.pageError = error;
    this.changeDetector.detectChanges();
  }

  // DATA LOADING

  loadData(): void {
    this.pageLoaded = false;
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
          this.noPatron = checkIfBlank(result.team.patron);

          this.pageLoaded = true;
          this.changeDetector.detectChanges();
        },
        error: (err) => this.handleError(err),
      });
  }

  // FUNCTIONALITIES

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

        this.loadData();
      },
      error: (err) => this.handleError(err),
    });
  }

  // NAVIGATION

  navigateToTeams(): void {
    this.navigationService.navigateTeams();
  }

  navigateToEditUser(): void {
    this.navigationService.navigateToEditUser();
  }
}
