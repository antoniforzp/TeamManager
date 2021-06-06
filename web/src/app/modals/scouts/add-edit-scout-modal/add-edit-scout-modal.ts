import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Scout } from 'src/app/model/data/Scout';
import { ModalModes, ModalWidths } from '../../Modals-def';
import {
  AddEditScoutModalComponent,
  AddEditScoutModalComponentEntry,
} from './add-edit-scout-modal.component';

export class AddEditScoutModal {
  constructor(private dialog: MatDialog) {}

  async openAdd(): Promise<MatDialogRef<AddEditScoutModalComponent>> {
    await import('./add-edit-scout-modal.module');
    return this.dialog.open(AddEditScoutModalComponent, {
      width: ModalWidths.MEDIUM,
      disableClose: true,
      data: {
        mode: ModalModes.ADD,
      } as AddEditScoutModalComponentEntry,
    });
  }

  async openEdit(
    scout: Scout
  ): Promise<MatDialogRef<AddEditScoutModalComponent>> {
    await import('./add-edit-scout-modal.module');
    return this.dialog.open(AddEditScoutModalComponent, {
      width: ModalWidths.MEDIUM,
      disableClose: true,
      data: {
        mode: ModalModes.EDIT,
        scoutData: scout,
      } as AddEditScoutModalComponentEntry,
    });
  }
}
