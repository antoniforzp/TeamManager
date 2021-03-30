import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  ManageScoutsRolesModalComponent,
  ScoutRolesData,
} from './manage-scouts-roles-modal.component';

export class ManageScoutRolesModal {
  constructor(private dialog: MatDialog) {}

  open(scoutIdEdit: number): MatDialogRef<ManageScoutsRolesModalComponent> {
    return this.dialog.open(ManageScoutsRolesModalComponent, {
      width: '80%',
      disableClose: true,
      data: {
        scoutId: scoutIdEdit,
      } as ScoutRolesData,
    });
  }
}
