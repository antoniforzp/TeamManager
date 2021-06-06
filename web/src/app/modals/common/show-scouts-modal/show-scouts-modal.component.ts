import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, of, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { AddEditScoutModal } from 'src/app/modals/scouts/add-edit-scout-modal/add-edit-scout-modal';
import { DeleteScoutModal } from 'src/app/modals/scouts/delete-scout-modal/delete-scout-modal';
import { EditScoutRolesModal } from 'src/app/modals/scouts/edit-scout-roles-modal/edit-scout-roles-modal';
import { ExportCsvScoutModal } from 'src/app/modals/scouts/export-csv-scouts-modal/export-csv-scout-modal';
import { ScoutInfoModal } from 'src/app/modals/scouts/scout-info-modal/scout-info-modal';
import { Role } from 'src/app/model/data/Role';
import { Scout } from 'src/app/model/data/Scout';
import { SearchPipe } from 'src/app/pipes/search.pipe';
import { ScoutsService } from 'src/app/services/data/scouts.service';
import { SortService } from 'src/app/services/tools/sort.service';
import { DropdownAction } from 'src/app/utils/DropdownAction';
import { PageModes } from 'src/app/utils/PageModes';
import { Results } from 'src/app/utils/Result';
interface RoleDisplay {
  roleId: number;
  name: string;
  label: string;
}
interface ScoutRowData {
  nameSurname: string;
  troop: string;
  roles: RoleDisplay[];

  instructorRankName: string;
  instructorRankAbbv: string;
  instructorRankAbbvFilter: string;
  instructorRankLabel: string;

  rankName: string;
  rankId: number;

  isSelected: boolean;
  scoutObject: Scout;
  rolesList: Role[];
  rolesSquashed: string;
}

enum Actions {
  ADD,
  EDIT_CREDENTIALS,
  EDIT_ROLES,
  DELETE,
  EXPORT_CSV,
}

export interface ShowScoutsModalComponentEntry {
  scoutsData: Scout[];
  pageMode: PageModes;
}

@Component({
  templateUrl: './show-scouts-modal.component.html',
  styleUrls: ['./show-scouts-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowScoutsModalComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  pageLoaded = false;
  pageError: HttpErrorResponse;

  pageMode: PageModes;

  allSelected = false;
  scoutsData = [] as Scout[];

  scouts = [] as ScoutRowData[];
  scoutsInitial = [] as ScoutRowData[];
  scoutsFiltered = [] as ScoutRowData[];

  actions = new Map<Actions, DropdownAction>();

  searchPhrase: string;
  filterKeys = [
    'nameSurname',
    'troop',
    'rankName',
    'instructorRankAbbvFilter',
    'rolesSquashed',
  ];

  constructor(
    private scoutsService: ScoutsService,
    private sortService: SortService,
    private searchPipe: SearchPipe,
    private translate: TranslateService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ShowScoutsModalComponent>,
    private changeDetector: ChangeDetectorRef,

    @Inject(MAT_DIALOG_DATA) data: ShowScoutsModalComponentEntry
  ) {
    this.scoutsData = data.scoutsData;
    this.pageMode = data.pageMode;
  }

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
      scouts: of(this.scoutsData),
      roles: this.scoutsService.getAllRoles(),
    })
      .pipe(
        takeUntil(this.destroy$),
        map((x) => {
          const rows = [] as ScoutRowData[];
          x.scouts.forEach((scout) => {
            const scoutRoles = x.roles.filter(
              (r) => r.scoutId === scout.scoutId
            );

            const rolesDisplay = x.roles
              .filter((r) => r.scoutId === scout.scoutId)
              .map((r1) => {
                return {
                  roleId: r1.roleId,
                  name: r1.name,
                  label: `role-${r1.roleId}`,
                } as RoleDisplay;
              });

            const iRankAbbriv =
              scout.irank?.rankId !== 1 ? scout.irank?.abbreviation : '';

            const iRankAbbrivFilter = scout.irank?.abbreviation
              ? this.translate.instant(scout.irank?.abbreviation)
              : '';

            rows.push({
              nameSurname: scout.name + ' ' + scout.surname,
              troop: scout.patrol.name,
              roles: rolesDisplay,
              instructorRankName: scout.irank?.name,
              instructorRankAbbv: iRankAbbriv,
              instructorRankAbbvFilter: iRankAbbrivFilter,
              instructorRankLabel: scout.irank?.rankId
                ? `instructor-rank-${scout.irank.rankId}`
                : null,
              rankName: scout.rank.name,
              rankId: scout.rank.rankId,

              isSelected: false,
              scoutObject: scout,
              rolesList: scoutRoles,
              rolesSquashed: this.squashedRoleNames(scoutRoles),
            });
          });
          return rows;
        })
      )
      .subscribe({
        next: (result) => {
          this.scouts = result;
          this.scoutsInitial = this.scouts;

          this.filterData();

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

  squashedRoleNames(roles: Role[]): string {
    let squashed = '';
    roles.forEach((x) => {
      squashed = squashed.concat(this.translate.instant(x.name)) + ' ';
    });
    return squashed;
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

  // SORTING

  sortData(sort: Sort): void {
    this.scouts = this.sortService.sort(this.scoutsInitial, sort);
    this.filterData();
  }

  // FILTERING

  onFilterChange(searchPhrase: string): void {
    this.searchPhrase = searchPhrase;
    this.filterData();
  }

  filterData(): void {
    this.scoutsFiltered = this.searchPipe.transform(
      this.scouts,
      this.filterKeys,
      this.searchPhrase ? this.searchPhrase : ''
    );
    this.changeDetector.detectChanges();
  }

  // FUNCTIONALITIES

  close(): void {
    this.dialogRef.close(Results.CANCEL);
  }

  // ACTION FACTORY

  setActions(): void {
    const selected = this.scouts.filter((x) => x.isSelected);
    this.actions.clear();

    this.actions.set(Actions.ADD, {
      label: 'Dodaj',
      isEnabled: true,
      isVisible: this.pageMode === PageModes.FUNCTIONAL,
      action: () => this.openAddScout(),
    });

    this.actions.set(Actions.EDIT_CREDENTIALS, {
      label: 'Edytuj dane',
      isEnabled: selected.length === 1,
      isVisible: this.pageMode === PageModes.FUNCTIONAL,
      action: () => this.openEditScout(),
    });

    this.actions.set(Actions.EDIT_ROLES, {
      label: 'Edytuj funkcje',
      isEnabled: selected.length === 1,
      isVisible: this.pageMode === PageModes.FUNCTIONAL,
      action: () => this.openEditRoles(),
    });

    this.actions.set(Actions.DELETE, {
      label: 'Usuń',
      isEnabled: selected.length > 0,
      isVisible: this.pageMode === PageModes.FUNCTIONAL,
      action: () => this.openDeleteScout(),
    });

    this.actions.set(Actions.EXPORT_CSV, {
      label: 'Eksportuj do CSV',
      isEnabled: selected.length > 0,
      isVisible: true,
      action: () => this.openExportScout(),
    });
  }

  // ACTIONS

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
