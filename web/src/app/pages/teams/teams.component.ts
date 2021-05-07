import { HttpErrorResponse } from '@angular/common/http';
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
import { AddEditTeamModal } from 'src/app/modals/teams/add-edit-team-modal/add-edit-team-modal';
import { DeleteTeamModal } from 'src/app/modals/teams/delete-team-modal/delete-team-modal';
import { Team } from 'src/app/model/Team';
import { TeamsService } from 'src/app/services/data/teams.service';
import { AppRoutes } from 'src/app/shared/menu/Routes';
import { DropdownAction } from 'src/app/utils/DropdownAction';
import { Results } from 'src/app/utils/Result';

interface TeamDataRow {
  name: string;
  patron?: string;

  teamObject: Team;
  isSelected: boolean;
}

enum Actions {
  ADD,
  EDIT,
  DELETE,
}

@Component({
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamsComponent implements OnInit, OnDestroy {
  AppRoutes = AppRoutes;
  destroy$ = new Subject();

  pageLoaded = false;
  pageError: HttpErrorResponse;

  actions = new Map<Actions, DropdownAction>();

  // Selection
  allSelected = false;

  teams = [] as TeamDataRow[];

  constructor(
    private teamsService: TeamsService,
    private changeDetector: ChangeDetectorRef,
    private dialog: MatDialog
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  ngOnInit(): void {
    this.loadData();
  }

  // DATA LOADING

  loadData(): void {
    this.allSelected = false;
    this.pageLoaded = false;
    this.teamsService
      .getUserTeams()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (teams) => {
          this.teams = teams.map((x) => {
            return {
              name: x.name,
              patron: x.patron,
              isSelected: false,
              teamObject: x,
            } as TeamDataRow;
          });

          this.pageLoaded = true;
          this.changeDetector.detectChanges();
        },
        error: (err) => {
          this.pageLoaded = true;
          this.pageError = err;
          this.changeDetector.detectChanges();
        },
      });
  }

  // ACTIONS FACTORY

  setActions(): void {
    const selected = this.teams.filter((x) => x.isSelected);
    this.actions.clear();

    this.actions.set(Actions.ADD, {
      label: 'actions.add',
      isEnabled: true,
      action: () => this.openAddTeamModal(),
    });

    this.actions.set(Actions.EDIT, {
      label: 'actions.edit',
      isEnabled: selected.length === 1,
      action: () => this.openEditTeamModal(),
    });

    this.actions.set(Actions.DELETE, {
      label: 'actions.delete',
      isEnabled: selected.length >= 1,
      action: () => this.openDeleteTeamsModal(),
    });
  }

  openAddTeamModal(): void {
    new AddEditTeamModal(this.dialog).openAdd().then((x) =>
      x.afterClosed().subscribe((result) => {
        if (result === Results.SUCCESS) {
          this.loadData();
        }
      })
    );
  }

  openEditTeamModal(): void {
    const selected = this.teams
      .filter((x) => x.isSelected)
      .map((x) => x.teamObject);

    new AddEditTeamModal(this.dialog).openEdit(selected[0]).then((x) =>
      x.afterClosed().subscribe((result) => {
        if (result === Results.SUCCESS) {
          this.loadData();
        }
      })
    );
  }

  openDeleteTeamsModal(): void {
    const selected = this.teams
      .filter((x) => x.isSelected)
      .map((x) => x.teamObject);

    new DeleteTeamModal(this.dialog).open(selected).then((x) =>
      x.afterClosed().subscribe((result) => {
        if (result === Results.SUCCESS) {
          this.loadData();
        }
      })
    );
  }

  // SELECTION

  toggleSelected(team: TeamDataRow): void {
    team.isSelected = !team.isSelected;

    this.checkAllSelected();
    this.changeDetector.detectChanges();
  }

  checkAllSelected(): void {
    this.allSelected = this.teams.filter((x) => !x.isSelected).length === 0;
    this.changeDetector.detectChanges();
  }

  toggleSelectAll(value: boolean): void {
    this.allSelected = value;
    this.teams.forEach((x) => (x.isSelected = this.allSelected));
    this.changeDetector.detectChanges();
  }
}
