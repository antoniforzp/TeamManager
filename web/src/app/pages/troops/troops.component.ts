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
import { takeUntil } from 'rxjs/operators';
import { ShowScoutsModal } from 'src/app/modals/common/show-scouts-modal/show-scouts-modal';
import { AddEditTroopModal } from 'src/app/modals/troops/add-edit-troop-modal/add-edit-troop-modal';
import { DeleteTroopModal } from 'src/app/modals/troops/delete-troop-modal/delete-troop-modal';
import { Role } from 'src/app/model/Role';
import { Scout } from 'src/app/model/Scout';
import { Patrol } from 'src/app/model/Patrol';
import { ScoutsService } from 'src/app/services/data/scouts.service';
import { PatrolsService } from 'src/app/services/data/patrols.service';
import { AppRoutes } from 'src/app/shared/menu/Routes';
import { DropdownAction } from 'src/app/utils/DropdownAction';
import { Results } from 'src/app/utils/Result';
import { PatrolsInfoModal } from 'src/app/modals/troops/patrols-info-modal/patrols-info-modal';

interface TroopRowData {
  name: string;
  leaders: {
    scout: Scout;
    role: Role;
  }[];

  troopScouts: Scout[];
  troopData: Patrol;
  isSelected: boolean;
}

enum Actions {
  ADD,
  EDIT,
  DELETE,
  SHOW_SCOUTS,
}

@Component({
  templateUrl: './troops.component.html',
  styleUrls: ['./troops.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TroopsComponent implements OnInit, OnDestroy {
  AppRoutes = AppRoutes;
  destroy$ = new Subject();

  pageLoaded = false;
  pageError: HttpErrorResponse;

  allSelected = false;

  troopsData: TroopRowData[];

  troops: Patrol[];
  scouts: Scout[];
  scoutRoles: Role[];

  actions = new Map<Actions, DropdownAction>();

  constructor(
    private troopsService: PatrolsService,
    private scoutsService: ScoutsService,
    private changeDetector: ChangeDetectorRef,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  // DATA LOADING

  loadData(): void {
    this.allSelected = false;
    forkJoin({
      troops: this.troopsService.getPatrols(),
      scouts: this.scoutsService.getScouts(),
      scoutRoles: this.scoutsService.getAllRoles(),
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (result) => {
          this.troops = result.troops;
          this.scouts = result.scouts;
          this.scoutRoles = result.scoutRoles;

          this.troopsData = this.troops.map((x) => {
            return {
              name: x.name,
              leaders: this.getLeaders(x).map((leader) => {
                return {
                  scout: leader,
                  role: this.scoutRoles.find(
                    (role) => role.scoutId === leader.scoutId
                  ),
                };
              }),
              troopScouts: this.scouts.filter(
                (s) => s.patrol.patrolId === x.patrolId
              ),
              troopData: x,
              isSelected: false,
            } as TroopRowData;
          });

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

  toggleSelected(scout: TroopRowData): void {
    scout.isSelected = !scout.isSelected;

    this.checkAllSelected();
    this.changeDetector.detectChanges();
  }

  checkAllSelected(): void {
    this.allSelected =
      this.troopsData.filter((x) => !x.isSelected).length === 0;
    this.changeDetector.detectChanges();
  }

  toggleSelectAll(value: boolean): void {
    this.allSelected = value;
    this.troopsData.forEach((x) => (x.isSelected = this.allSelected));
    this.changeDetector.detectChanges();
  }

  // UTILS

  getLeaders(troop: Patrol): Scout[] {
    return (
      this.scouts
        // Find scouts belonging to given troop
        .filter((x) => x.patrol.patrolId === troop.patrolId)
        // Get those who have an role of id 6 (troop leader) or 5 (deputy troop leader) attached to them
        .filter((x) =>
          this.scoutRoles.find(
            (r) => r.scoutId === x.scoutId && (r.roleId === 6 || r.roleId === 5)
          )
        )
    );
  }

  getLeaderRoles(scoutId: number): Role[] {
    return this.scoutRoles.filter(
      (r) => r.scoutId === scoutId && (r.roleId === 6 || r.roleId === 5)
    );
  }

  createRoleBadge(role: Role): string {
    return 'role-' + role.roleId;
  }

  // ACTION FACTORY

  setActions(): void {
    const selected = this.troopsData.filter((x) => x.isSelected);
    this.actions.clear();
    this.actions.set(Actions.ADD, {
      label: 'actions.add',
      isEnabled: true,
      action: () => this.openAddTroop(),
    });

    this.actions.set(Actions.EDIT, {
      label: 'actions.edit',
      isEnabled: selected.length === 1,
      action: () => this.openEditTroop(),
    });

    this.actions.set(Actions.DELETE, {
      label: 'actions.delete',
      isEnabled: selected.length > 0,
      action: () => this.openDeleteTroop(),
    });

    this.actions.set(Actions.SHOW_SCOUTS, {
      label: 'actions.show-scouts',
      isEnabled: selected.length > 0,
      action: () => this.openShowScouts(),
    });
  }

  openAddTroop(): void {
    new AddEditTroopModal(this.dialog).openAdd().then((x) =>
      x.afterClosed().subscribe((result) => {
        if (result === Results.SUCCESS) {
          this.loadData();
        }
      })
    );
  }

  openEditTroop(): void {
    const selected = this.troopsData
      .filter((x) => x.isSelected)
      .map((x) => x.troopData);

    new AddEditTroopModal(this.dialog).openEdit(selected[0]).then((x) =>
      x.afterClosed().subscribe((result) => {
        if (result === Results.SUCCESS) {
          this.loadData();
        }
      })
    );
  }

  openDeleteTroop(): void {
    const selected = this.troopsData
      .filter((x) => x.isSelected)
      .map((x) => x.troopData);

    new DeleteTroopModal(this.dialog).open(selected).then((x) =>
      x.afterClosed().subscribe((result) => {
        if (result === Results.SUCCESS) {
          this.loadData();
        }
      })
    );
  }

  openShowScouts(): void {
    const selected = this.troopsData
      .filter((x) => x.isSelected)
      .map((x) => x.troopData);

    const scouts = this.scouts.filter((x) =>
      selected.find((t) => t.patrolId === x.patrol.patrolId)
    );

    new ShowScoutsModal(this.dialog).open(scouts).then((x) =>
      x.afterClosed().subscribe(() => {
        this.loadData();
      })
    );
  }

  // DETAILS

  openTroopsInfoModal(): void {
    new PatrolsInfoModal(this.dialog).open();
  }

  openShowScoutsByLink(troop: Patrol): void {
    const scouts = this.scouts.filter(
      (x) => x.patrol.patrolId === troop.patrolId
    );

    new ShowScoutsModal(this.dialog).open(scouts).then((x) =>
      x.afterClosed().subscribe(() => {
        this.loadData();
      })
    );
  }
}
