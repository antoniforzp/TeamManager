import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Role } from 'src/app/model/Role';
import { RolesService } from 'src/app/services/roles.service';
import { ScoutsService } from 'src/app/services/scouts.service';
import { ProgressModal } from '../common/progress-modal/ProgressModal';

export interface ScoutRolesData {
  scoutId: number;
}

@Component({
  selector: 'app-manage-scouts-roles-modal',
  templateUrl: './manage-scouts-roles-modal.component.html',
  styleUrls: ['./manage-scouts-roles-modal.component.scss'],
})
export class ManageScoutsRolesModalComponent implements OnInit {
  scoutId!: number;

  initialScoutRoles = [] as Role[];
  allRoles = [] as Role[];

  scoutRoles$ = new BehaviorSubject<Role[]>([]);
  availableRoles$ = new BehaviorSubject<Role[]>([]);

  constructor(
    private dialog: MatDialog,
    private rolesService: RolesService,
    private scoutsService: ScoutsService,
    private dialogRef: MatDialogRef<ManageScoutsRolesModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ScoutRolesData
  ) {
    this.scoutId = data.scoutId;

    forkJoin({
      roles: this.rolesService.getRoles(),
      scout: this.scoutsService.getScout(data.scoutId),
      scoutRoles: this.scoutsService.getRoles(data.scoutId),
    }).subscribe((x) => {
      this.allRoles = x.roles;
      this.initialScoutRoles = x.scoutRoles;

      this.scoutRoles$.next(x.scoutRoles);
      this.availableRoles$.next(
        x.roles.filter(
          (r) => !x.scoutRoles.find((r1) => r1.roleId === r.roleId)
        )
      );
    });
  }

  ngOnInit(): void {}

  // FUNCTIONALITIES

  public async close(): Promise<any> {
    this.dialogRef.close();
  }

  addRole(role: Role): void {
    this.scoutRoles$.next(this.scoutRoles$.value.concat([role]));

    this.availableRoles$.next(
      this.allRoles.filter(
        (x) => !this.scoutRoles$.value.find((r) => r.roleId === x.roleId)
      )
    );
  }

  addAll(): void {
    this.availableRoles$.value.forEach((x) => this.addRole(x));
  }

  deleteRole(role: Role): void {
    this.availableRoles$.next(this.availableRoles$.value.concat([role]));

    this.scoutRoles$.next(
      this.scoutRoles$.value.filter((x) => x.roleId !== role.roleId)
    );
  }

  deleteAll(): void {
    this.scoutRoles$.value.forEach((x) => this.deleteRole(x));
  }

  save(): void {
    if (this.scoutId) {
      const queuedAddTasks = [] as Observable<boolean>[];
      const queuedDeleteTasks = [] as Observable<boolean>[];

      // Add only new roles. Old leave
      this.scoutRoles$.value
        .filter(
          (r) => !this.initialScoutRoles.find((r1) => r1.roleId === r.roleId)
        )
        .forEach((x) => {
          queuedAddTasks.push(
            this.scoutsService.addRole(this.scoutId, x.roleId)
          );
        });

      // Delete only missing roles.
      this.initialScoutRoles
        .filter(
          (r) => !this.scoutRoles$.value.find((r1) => r1.roleId === r.roleId)
        )
        .forEach((x) => {
          queuedDeleteTasks.push(
            this.scoutsService.addRole(this.scoutId, x.roleId)
          );
        });

      const combinedAll = forkJoin(
        queuedAddTasks.concat(queuedDeleteTasks)
      ).pipe(map((x) => !x.includes(false)));

      new ProgressModal(this.dialog)
        .open(combinedAll, {
          failureMessage:
            'Nie udało się dodać funkcji. Sprawdź wszystkie dane.',
        })
        .afterClosed()
        .subscribe((x) => this.dialogRef.close(x));
    }
  }
}
