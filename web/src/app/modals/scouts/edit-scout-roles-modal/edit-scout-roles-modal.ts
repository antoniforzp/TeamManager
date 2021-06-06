import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Role } from 'src/app/model/data/Role';
import { Scout } from 'src/app/model/data/Scout';
import { ModalWidths } from '../../Modals-def';
import {
  EditScoutRolesModalComponent,
  EditScoutRolesModalComponentEntry,
} from './edit-scout-roles-modal.component';
export class EditScoutRolesModal {
  constructor(private dialog: MatDialog) {}

  async open(
    scout: Scout,
    roles?: Role[]
  ): Promise<MatDialogRef<EditScoutRolesModalComponent>> {
    await import('./edit-scout-roles-modal.module');
    return this.dialog.open(EditScoutRolesModalComponent, {
      width: ModalWidths.MEDIUM,
      disableClose: true,
      data: {
        scout,
        roles,
      } as EditScoutRolesModalComponentEntry,
    });
  }
}
