import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { AddEditScoutModal } from 'src/app/modals/scouts/add-edit-scout-modal/add-edit-scout-modal';
import { DeleteScoutModal } from 'src/app/modals/scouts/delete-scout-modal/delete-scout-modal';
import { EditScoutRolesModal } from 'src/app/modals/scouts/edit-scout-roles-modal/edit-scout-roles-modal';
import { ExportCsvScoutModal } from 'src/app/modals/scouts/export-csv-scouts-modal/export-csv-scout-modal';
import { RanksInfoModal } from 'src/app/modals/scouts/ranks-info-modal/ranks-info-modal';
import { ScoutInfoModal } from 'src/app/modals/scouts/scout-info-modal/scout-info-modal';
import { Role } from 'src/app/model/Role';

import { Scout } from 'src/app/model/Scout';
import { ScoutsService } from 'src/app/services/data/scouts.service';
import { AppRoutes } from 'src/app/shared/menu/Routes';
import { DropdownAction } from 'src/app/utils/DropdownAction';
import { Results } from 'src/app/utils/Result';

interface ScoutRowData {
  nameSurname: string;
  troop: string;
  roles: { name: string; label: string }[];

  instructorRankAbbv: string;
  instructorRankLabel: string;
  rankName: string;

  isSelected: boolean;
  scoutObject: Scout;
  rolesList: Role[];
}

enum Actions {
  ADD,
  EDIT_CREDENTIALS,
  EDIT_ROLES,
  DELETE,
  EXPORT_CSV,
}

@Component({
  templateUrl: './scouts.component.html',
  styleUrls: ['./scouts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScoutsComponent implements OnInit, OnDestroy {
  AppRoutes = AppRoutes;
  destroy$ = new Subject();
  pageLoaded = false;

  pageError: HttpErrorResponse;

  allSelected = false;
  scouts = [] as ScoutRowData[];

  actions = new Map<Actions, DropdownAction>();

  constructor(
    private scoutsService: ScoutsService,
    private dialog: MatDialog,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  // DATA FETCHING

  loadData(): void {
    this.allSelected = false;
    this.pageLoaded = false;

    forkJoin({
      scouts: this.scoutsService.getScouts(),
      roles: this.scoutsService.getAllRoles(),
    })
      .pipe(
        takeUntil(this.destroy$),
        map((x) => {
          const rows = [] as ScoutRowData[];
          x.scouts.forEach((scout) =>
            rows.push({
              nameSurname: scout.name + ' ' + scout.surname,
              troop: scout.patrol.name,
              roles: x.roles
                .filter((r) => r.scoutId === scout.scoutId)
                .map((r1) => {
                  return {
                    name: r1.name,
                    label: `role-${r1.roleId}`,
                  } as { name: string; label: string };
                }),
              instructorRankAbbv:
                scout.irank?.rankId !== 1 ? scout.irank?.abbreviation : '',
              instructorRankLabel: scout.irank?.rankId
                ? `instructor-rank-${scout.irank.rankId}`
                : null,
              rankName: scout.rank.name,

              isSelected: false,
              scoutObject: scout,
              rolesList: x.roles.filter((r) => r.scoutId === scout.scoutId),
            })
          );
          return rows;
        })
      )
      .subscribe({
        next: (result) => {
          this.scouts = result;
          this.pageLoaded = true;
          this.changeDetector.detectChanges();
        },
        error: (err) => {
          this.pageError = err;
          this.pageLoaded = true;
          this.changeDetector.detectChanges();
        },
      });
  }

  // SELECTION

  toggleSelected(scout: ScoutRowData): void {
    scout.isSelected = !scout.isSelected;

    this.checkAllSelected();
    this.changeDetector.detectChanges();
  }

  checkAllSelected(): void {
    this.allSelected = this.scouts.filter((x) => !x.isSelected).length === 0;
    this.changeDetector.detectChanges();
  }

  toggleSelectAll(value: boolean): void {
    this.allSelected = value;
    this.scouts.forEach((x) => (x.isSelected = this.allSelected));
    this.changeDetector.detectChanges();
  }

  // ACTION FACTORY

  setActions(): void {
    const selected = this.scouts.filter((x) => x.isSelected);
    this.actions.clear();

    this.actions.set(Actions.ADD, {
      label: 'actions.add',
      isEnabled: true,
      action: () => this.openAddScout(),
    });

    this.actions.set(Actions.EDIT_CREDENTIALS, {
      label: 'scouts.edit-data',
      isEnabled: selected.length === 1,
      action: () => this.openEditScout(),
    });

    this.actions.set(Actions.EDIT_ROLES, {
      label: 'scouts.edit-roles',
      isEnabled: selected.length === 1,
      action: () => this.openEditRoles(),
    });

    this.actions.set(Actions.DELETE, {
      label: 'actions.delete',
      isEnabled: selected.length > 0,
      action: () => this.openDeleteScout(),
    });

    this.actions.set(Actions.EXPORT_CSV, {
      label: 'actions.export-csv',
      isEnabled: selected.length > 0,
      action: () => this.openExportScout(),
    });
  }

  // ACTIONS

  openRanksInfoModal(): void {
    new RanksInfoModal(this.dialog).open();
  }

  openShowInfoModal(scout: Scout, roles: Role[]): void {
    new ScoutInfoModal(this.dialog).open(scout, roles);
  }

  openAddScout(): void {
    new AddEditScoutModal(this.dialog).openAdd().then((x) => {
      x.afterClosed().subscribe((result) => {
        if (result === Results.SUCCESS) {
          this.loadData();
        }
      });
    });
  }

  openEditScout(): void {
    const selected = this.scouts.filter((x) => x.isSelected);
    new AddEditScoutModal(this.dialog)
      .openEdit(selected[0].scoutObject)
      .then((x) => {
        x.afterClosed().subscribe((result) => {
          if (result === Results.SUCCESS) {
            this.loadData();
          }
        });
      });
  }

  openEditRoles(): void {
    const selected = this.scouts.filter((x) => x.isSelected);
    if (selected.length === 1) {
      new EditScoutRolesModal(this.dialog)
        .open(selected[0].scoutObject, selected[0].rolesList)
        .then((x) => {
          x.afterClosed().subscribe((result) => {
            if (result === Results.SUCCESS) {
              this.loadData();
            }
          });
        });
    }
  }

  openDeleteScout(): void {
    const selected = this.scouts.filter((x) => x.isSelected);
    new DeleteScoutModal(this.dialog)
      .open(selected.map((x) => x.scoutObject))
      .then((x) => {
        x.afterClosed().subscribe((result) => {
          if (result === Results.SUCCESS) {
            this.loadData();
          }
        });
      });
  }

  openExportScout(): void {
    const selected = this.scouts.filter((x) => x.isSelected);
    new ExportCsvScoutModal(this.dialog)
      .open(
        selected.map((x) => x.scoutObject),
        selected.map((x) => {
          return {
            scoutId: x.scoutObject.scoutId,
            roles: x.rolesList,
          };
        })
      )
      .then((x) => {
        x.afterClosed().subscribe((result) => {
          if (result === Results.SUCCESS) {
            this.loadData();
          }
        });
      });
  }
}
