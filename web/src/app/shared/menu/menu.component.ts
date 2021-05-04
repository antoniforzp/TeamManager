import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LogoutModal } from 'src/app/modals/home/logout-modal/logout-modal';
import { SettingsModal } from 'src/app/modals/home/settings-modal/settings-modal';
import { NavigationService } from 'src/app/services/core/navigation.service';
import { TeamsService } from 'src/app/services/teams.service';
import { Results } from 'src/app/utils/Result';
import { MenuService } from './menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent implements OnInit {
  lockedOptions = false;

  constructor(
    private teamsService: TeamsService,
    private changeDetector: ChangeDetectorRef,
    private dialog: MatDialog,
    private router: Router,
    private navigatorService: NavigationService
  ) {}

  ngOnInit(): void {
    this.teamsService.getCurrentUserTeamsNo().subscribe((x) => {
      this.lockedOptions = x <= 0;
      this.changeDetector.detectChanges();
    });
  }

  logout(): void {
    new LogoutModal(this.dialog).open().then((x) =>
      x.afterClosed().subscribe((result) => {
        if (result === Results.SUCCESS) {
          this.router.navigateByUrl('/login');
        }
      })
    );
  }

  settings(): void {
    new SettingsModal(this.dialog).open();
  }

  public navigateToHome(): void {
    this.navigatorService.navigateToHome();
  }

  public navigateToScouts(): void {
    this.navigatorService.navigateToScouts();
  }

  public navigateToMeetingsJourneys(): void {
    this.navigatorService.navigateToMeetingsJourneys();
  }
}
