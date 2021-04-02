import { HttpErrorResponse } from '@angular/common/http';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin, of, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { ManageScoutModal } from 'src/app/modals/scouts/manage-scout-modal/ManageScoutModal';
import { ManageScoutRolesModal } from 'src/app/modals/scouts/manage-scouts-roles-modal/ManageScoutRolesModal';

import { Scout } from 'src/app/model/Scout';
import { MenuAction } from 'src/app/utils/MenuAction';
import { Results } from 'src/app/utils/Result';
import { ScoutsService } from '../../services/scouts.service';

interface ScoutRowData {
  nameSurname: string;
  troop: string;
  roles: { name: string; label: string }[];

  instructorRankLabel: string;
  rankName: string;

  isSelected: boolean;
  scoutObject: Scout;
}

enum MenuActionsTypes {
  EditData,
  EditRoles,
  Delete,
  ExportCSV,
}

@Component({
  templateUrl: './scouts.component.html',
  styleUrls: ['./scouts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScoutsComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  pageLoaded = false;

  pageError: HttpErrorResponse;
  validCurrentPassword: boolean;

  allSelected = false;
  scouts = [] as ScoutRowData[];

  actions = new Map<MenuActionsTypes, MenuAction>();

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
              troop: scout.troop.name,
              roles: x.roles
                .filter((r) => r.scoutId === scout.scoutId)
                .map((r1) => {
                  return {
                    name: r1.name,
                    label: `role-${r1.roleId}`,
                  } as { name: string; label: string };
                }),

              instructorRankLabel: `instructor-rank-${scout.instructorRank.rankId}`,
              rankName: scout.rank.name,

              isSelected: false,
              scoutObject: scout,
            })
          );
          return rows;
        })
      )
      .subscribe({
        next: (result) => {
          console.log(result);

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

    this.actions.set(MenuActionsTypes.EditData, {
      label: 'Edytuj dane',
      isEnabled: selected.length === 1,
      execute: () => this.openEditScout(),
    });

    this.actions.set(MenuActionsTypes.EditRoles, {
      label: 'Edytuj funkcje',
      isEnabled: selected.length === 1,
      execute: () => this.openEditRoles(),
    });

    this.actions.set(MenuActionsTypes.Delete, {
      label: 'Usuń',
      isEnabled: selected.length > 0,
      execute: () => this.openEditRoles(),
    });

    this.actions.set(MenuActionsTypes.ExportCSV, {
      label: 'Eksportuj do CSV',
      isEnabled: selected.length > 0,
      execute: () => this.openExport(),
    });
  }

  // ACTIONS

  openAddScouts(): void {
    new ManageScoutModal(this.dialog)
      .openAdd()
      .afterClosed()
      .subscribe((x) => {
        if (x === Results.SUCCESS) {
          this.loadData();
        }
      });
  }

  openEditScout(): void {
    const selected = this.scouts.filter((x) => x.isSelected);
    if (selected.length === 1) {
      new ManageScoutModal(this.dialog)
        .openEdit(selected[0].scoutObject.scoutId)
        .afterClosed()
        .subscribe((x) => {
          if (x === Results.SUCCESS) {
            this.loadData();
          }
        });
    }
  }

  openEditRoles(): void {
    const selected = this.scouts.filter((x) => x.isSelected);
    if (selected.length === 1) {
      new ManageScoutRolesModal(this.dialog)
        .open(selected[0].scoutObject.scoutId)
        .afterClosed()
        .subscribe((x) => {
          if (x === Results.SUCCESS) {
            this.loadData();
          }
        });
    }
  }

  openDelete(): void {}

  openExport(): void {}
}
