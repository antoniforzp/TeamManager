import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Role } from 'src/app/model/Role';
import { Scout } from 'src/app/model/Scout';
import { Troop } from 'src/app/model/Troop';
import { ScoutsService } from 'src/app/services/scouts.service';
import { TroopsService } from 'src/app/services/troops.service';

interface TroopRowData {
  name: string;
  leaders: {
    scout: Scout;
    role: Role;
  }[];

  troopScouts: Scout[];
  troopData: Troop;
  isSelected: boolean;
}

interface DropdownAction {
  label: string;
  isEnabled: boolean;
  action: () => void;
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
  destroy$ = new Subject();
  pageLoaded = false;
  pageError: HttpErrorResponse;

  allSelected = false;

  troopsData: TroopRowData[];

  troops: Troop[];
  scouts: Scout[];
  scoutRoles: Role[];

  actions = new Map<Actions, DropdownAction>();

  constructor(
    private troopsService: TroopsService,
    private scoutsService: ScoutsService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  // DATA LOADING

  loadData(): void {
    forkJoin({
      troops: this.troopsService.getTroops(),
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
                (s) => s.troop.troopId === x.troopId
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

  getLeaders(troop: Troop): Scout[] {
    return (
      this.scouts
        // Find scouts belonging to given troop
        .filter((x) => x.troop.troopId === troop.troopId)
        // Get those who have an role of id 6 (troop leader) or 5 (deputy troop leader) attached to them
        .filter((x) =>
          this.scoutRoles.find(
            (r) => r.scoutId === x.scoutId && (r.roleId === 6 || r.roleId === 5)
          )
        )
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
      label: 'Dodaj',
      isEnabled: true,
      action: () => {},
    });

    this.actions.set(Actions.EDIT, {
      label: 'Edytuj',
      isEnabled: selected.length === 1,
      action: () => {},
    });

    this.actions.set(Actions.DELETE, {
      label: 'Usuń',
      isEnabled: selected.length === 1,
      action: () => {},
    });

    this.actions.set(Actions.SHOW_SCOUTS, {
      label: 'Pokaż harcerzy',
      isEnabled: selected.length === 1,
      action: () => {},
    });
  }
}
