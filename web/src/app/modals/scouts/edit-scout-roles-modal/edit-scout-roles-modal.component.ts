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
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Role } from 'src/app/model/Role';
import { Scout } from 'src/app/model/Scout';
import { RolesService } from 'src/app/services/roles.service';
import { ScoutsService } from 'src/app/services/scouts.service';
import { Results } from 'src/app/utils/Result';
import { ProgressModal } from '../../common/progress-modal/ProgressModal';

export interface EditScoutRolesModalComponentEntry {
  scout: Scout;
  roles?: Role[];
}

@Component({
  templateUrl: './edit-scout-roles-modal.component.html',
  styleUrls: ['./edit-scout-roles-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditScoutRolesModalComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  pageLoaded = false;
  pageError: HttpErrorResponse;

  scout: Scout;
  roles: Role[];
  allRoles: Role[];
  availableRoles: Role[];

  // Control flow
  rolesToAdd = [] as Role[];
  rolesToDelete = [] as Role[];

  constructor(
    private rolesService: RolesService,
    private scoutsService: ScoutsService,
    private dialogRef: MatDialogRef<EditScoutRolesModalComponent>,
    private changeDetector: ChangeDetectorRef,
    private dialog: MatDialog,

    @Inject(MAT_DIALOG_DATA) data: EditScoutRolesModalComponentEntry
  ) {
    this.scout = data.scout;
    this.roles = data.roles ? data.roles : [];
  }

  ngOnInit(): void {
    this.rolesService
      .getRoles()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (roles) => {
          this.allRoles = roles;
          this.availableRoles = this.allRoles.filter(
            (x) => !this.roles.find((r) => r.roleId === x.roleId)
          );
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

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  // FUNCTIONALITIES

  close(): void {
    this.dialogRef.close(Results.CANCEL);
  }

  addRole(role: Role): void {
    // To display
    this.roles.push(role);
    this.availableRoles = this.allRoles.filter(
      (x) => !this.roles.find((r) => r.roleId === x.roleId)
    );

    // Control flow
    this.rolesToAdd.push(role);
    this.rolesToDelete = this.rolesToDelete.filter(
      (x) => x.roleId !== role.roleId
    );

    this.changeDetector.detectChanges();
  }

  removeRole(role: Role): void {
    // To display
    this.roles = this.roles.filter((x) => x.roleId !== role.roleId);
    this.availableRoles = this.allRoles.filter(
      (x) => !this.roles.find((r) => r.roleId === x.roleId)
    );

    // Control flow
    this.rolesToDelete.push(role);
    this.rolesToAdd = this.rolesToAdd.filter((x) => x.roleId !== role.roleId);

    this.changeDetector.detectChanges();
  }

  edit(): void {
    const queue = [] as Observable<boolean>[];

    // Queue add requests up
    this.rolesToAdd.forEach((x) => {
      queue.push(this.scoutsService.addRole(this.scout.scoutId, x.roleId));
    });

    // Queue delete requests up
    this.rolesToDelete.forEach((x) => {
      queue.push(this.scoutsService.deleteRole(this.scout.scoutId, x.roleId));
    });

    new ProgressModal(this.dialog)
      .open(queue, {
        successMessage: 'Udało się zaktualizować funkcje harcerza',
        failureMessage: 'Nie udało się zaktualizować funkcji harcerza',
      })
      .then((x) =>
        x
          .afterClosed()
          .pipe(takeUntil(this.destroy$))
          .subscribe((result) => {
            if (result === Results.SUCCESS) {
              this.dialogRef.close(result);
            }
          })
      );
  }

  // UTILS

  createRoleBadge(role: Role): string {
    return 'role-' + role.roleId;
  }
}
