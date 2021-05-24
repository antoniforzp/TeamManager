import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalModes, ModalWidths } from '../../Modals-def';
import {
  AddEditTroopModalComponent,
  AddEditTroopModalComponentEntry,
} from './add-edit-troop-modal.component';
import { Patrol } from '../../../model/Patrol';

export class AddEditTroopModal {
  constructor(private dialog: MatDialog) {}

  async openAdd(): Promise<MatDialogRef<AddEditTroopModalComponent>> {
    await import('./add-edit-troop-modal.module');
    return this.dialog.open(AddEditTroopModalComponent, {
      width: ModalWidths.MEDIUM,
      disableClose: true,
      data: {
        mode: ModalModes.ADD,
      } as AddEditTroopModalComponentEntry,
    });
  }

  async openEdit(
    troop: Patrol
  ): Promise<MatDialogRef<AddEditTroopModalComponent>> {
    await import('./add-edit-troop-modal.module');
    return this.dialog.open(AddEditTroopModalComponent, {
      width: ModalWidths.MEDIUM,
      disableClose: true,
      data: {
        mode: ModalModes.EDIT,
        troopData: troop,
      } as AddEditTroopModalComponentEntry,
    });
  }
}
