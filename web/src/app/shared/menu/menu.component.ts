import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LogoutModal } from 'src/app/modals/home/logout-modal/logout-modal';
import { SettingsModal } from 'src/app/modals/home/settings-modal/settings-modal';
import { AppNavigationService } from 'src/app/services/core/app-navigation.service';
import { AppStateService } from 'src/app/services/core/app-state.service';
import { TeamsService } from 'src/app/services/data/teams.service';
import { Results } from 'src/app/utils/Result';
import { AppRoutes } from './Routes';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();

  lockedOptions = false;
  AppRoutes = AppRoutes;
  currentRoute: AppRoutes;

  constructor(
    private appStateService: AppStateService,
    private navigatorService: AppNavigationService,
    private changeDetector: ChangeDetectorRef,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.checkIfAnyTeam();
    this.navigatorService.currentRoute
      .pipe(takeUntil(this.destroy$))
      .subscribe((x) => {
        this.currentRoute = x;
        this.changeDetector.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  checkIfAnyTeam(): void {
    this.lockedOptions = this.appStateService.teamId === undefined;
    this.changeDetector.detectChanges();
  }

  logout(): void {
    new LogoutModal(this.dialog).open().then((x) =>
      x.afterClosed().subscribe((result) => {
        if (result === Results.SUCCESS) {
          this.navigatorService.navigateToLogin();
        }
      })
    );
  }

  settings(): void {
    new SettingsModal(this.dialog).open();
  }

  // NAVIGATION

  public navigateToHome(): void {
    this.navigatorService.navigateToHome();
  }

  public navigateToScouts(): void {
    this.navigatorService.navigateToScouts();
  }

  public navigateToTroops(): void {
    this.navigatorService.navigateToTroops();
  }

  public navigateToMeetingsJourneys(): void {
    this.navigatorService.navigateToMeetingsJourneys();
  }
}
