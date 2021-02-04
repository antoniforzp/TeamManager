import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { ManageScoutModal } from 'src/app/modals/manage-scout-modal/ManageScoutModal';

import { Role } from 'src/app/model/Role';
import { Scout } from 'src/app/model/Scout';
import { MenuAction } from 'src/app/utils/MenuAction';
import { Result } from 'src/app/utils/Result';
import { ScoutsService } from '../../services/scouts.service';

interface ScoutRow {
  scoutInfo: Scout;

  name: string;
  surname: string;
  troop: string;
  rank: string;
  instructorRank: string | undefined;

  scoutRoles: Role[];
  isSelected: boolean;
  moreVisible: boolean;
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
})
export class ScoutsComponent implements OnInit, AfterViewInit {
  scoutsRows = [] as ScoutRow[];

  pageLoaded = false;

  allSelected = false;
  anySelected = false;

  menuActions = new Map<MenuActionsTypes, MenuAction>();

  constructor(
    private scoutsService: ScoutsService,
    private dialog: MatDialog
  ) {}

  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.loadData();
  }

  // DATA FETCHING

  loadData(): void {
    forkJoin({
      scouts: this.scoutsService.getScouts(),
      roles: this.scoutsService.getAllRoles(),
    })
      .pipe(
        map((x) => {
          const rows = [] as ScoutRow[];
          x.scouts.forEach((scout) =>
            rows.push({
              scoutInfo: scout,

              name: scout.name,
              surname: scout.surname,
              rank: scout.rank.name,
              troop: scout.troop.name,
              instructorRank: scout.instructorRank?.name,

              scoutRoles: x.roles.filter(
                (role) => role.scoutId === scout.scoutId
              ),
              isSelected: false,
              moreVisible: false,
            })
          );
          return rows;
        })
      )
      .subscribe((result) => {
        this.scoutsRows = result;
        this.pageLoaded = true;
      });
  }

  // SELECTION

  toggleSelectAll(): void {
    this.allSelected = !this.allSelected;
    this.scoutsRows.forEach((x) => (x.isSelected = this.allSelected));
  }

  toggleSelect(row: ScoutRow): void {
    row.isSelected = !row.isSelected;
    // In case that user manually select all records in table
    this.allSelected =
      this.scoutsRows.filter((x) => !x.isSelected).length === 0;
  }

  toggleMore(row: ScoutRow): void {
    row.moreVisible = !row.moreVisible;
  }

  // SORTING

  sortData(sort: Sort): void {
    const data = this.scoutsRows.slice();
    if (!sort.active || sort.direction === '') {
      this.scoutsRows = data;
      return;
    }

    this.scoutsRows = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return this.compare(a.name, b.name, isAsc);
        case 'surname':
          return this.compare(a.surname, b.surname, isAsc);
        case 'troop':
          return this.compare(a.troop, b.troop, isAsc);
        case 'rank':
          return this.compare(
            a.rank + a.instructorRank,
            b.rank + a.instructorRank,
            isAsc
          );
        default:
          return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  // ACTION FACTORY

  setActions(): void {
    const selected = this.scoutsRows.filter((x) => x.isSelected);
    this.menuActions.clear();

    this.menuActions.set(MenuActionsTypes.EditData, {
      label: 'Edytuj dane',
      isEnabled: selected.length === 1,
      execute: () => this.openEditScout(),
    });

    this.menuActions.set(MenuActionsTypes.EditRoles, {
      label: 'Edytuj funkcje',
      isEnabled: selected.length === 1,
      execute: () => this.openEditRoles(),
    });

    this.menuActions.set(MenuActionsTypes.Delete, {
      label: 'Usuń',
      isEnabled: selected.length > 0,
      execute: () => this.openEditRoles(),
    });

    this.menuActions.set(MenuActionsTypes.ExportCSV, {
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
        if (x === Result.Success) {
          this.loadData();
        }
      });
  }

  openEditScout(): void {
    const selected = this.scoutsRows.filter((x) => x.isSelected);
    if (selected.length === 1) {
      new ManageScoutModal(this.dialog)
        .openEdit(selected[0].scoutInfo.scoutId)
        .afterClosed()
        .subscribe((x) => {
          if (x === Result.Success) {
            this.loadData();
          }
        });
    }
  }

  openEditRoles(): void {}

  openDelete(): void {}

  openExport(): void {}
}
