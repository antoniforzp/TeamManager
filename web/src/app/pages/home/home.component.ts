import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { forkJoin, Observable, of, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { Team } from 'src/app/model/data/Team';
import { User } from 'src/app/model/data/User';
import { AppNavigationService } from 'src/app/services/core/app-navigation.service';
import { AppStateService } from 'src/app/services/core/app-state.service';
import { HomeReloadService } from 'src/app/services/tools/home-reload.service';
import { checkIfBlank } from 'src/app/utils/FormsUtils';
import { CoreService } from '../../services/data/core.service';

interface HomeDataPayload {
  user: User;
  team: Team;
  userTeams: Team[];
}

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();

  pageLoaded = false;
  infoLoaded = new Subject();
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
    private appStateService: AppStateService,
    private homeReloadService: HomeReloadService,
    private navigationService: AppNavigationService,
    private changeDetector: ChangeDetectorRef
  ) {
    this.homeReloadService.reload.subscribe(() => this.loadData());
  }

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
      team: this.appStateService?.teamId
        ? this.coreService.getCurrentTeam()
        : of(undefined as Team),
      userTeams: this.coreService.getCurrentUserTeams(),
    })
      .pipe(
        takeUntil(this.destroy$),
        map((x) => this.setCheckCurrentTeam(x)),
        tap((x) => this.setPatronLabel(x.team?.patron))
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
          if (result.team) {
            this.noPatron = checkIfBlank(result.team?.patron);
          }

          this.pageLoaded = true;
          this.changeDetector.detectChanges();
        },
        error: (err) => this.handleError(err),
      });
  }

  setCheckCurrentTeam(payload: HomeDataPayload): HomeDataPayload {
    const data = {
      user: payload.user,
      team: payload.team,
      userTeams: payload.userTeams,
    } as HomeDataPayload;

    if (!data.team && data.userTeams.length > 0) {
      data.team = data.userTeams[0];
      this.appStateService.storeCurrentTeamId(data.team?.teamId);
    }

    return data;
  }

  setPatronLabel(patron: any): void {
    if (!patron || patron === '') {
      patron = ' ';
    }
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

  navigateToTeamsAddTeam(): void {
    this.navigationService.navigateTeams(true);
  }

  navigateToEditUser(): void {
    this.navigationService.navigateToEditUser();
  }
}
