import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Team } from 'src/app/model/Team';
import { Troop } from 'src/app/model/Troop';
import { ModalWidths } from '../../Modals-def';
import {
  DeleteTroopModalComponent,
  DeleteTroopModalComponentEntry,
} from './delete-troop-modal.component';

export class DeleteTroopModal {
  constructor(private dialog: MatDialog) {}

  async open(
    troops: Troop[]
  ): Promise<MatDialogRef<DeleteTroopModalComponent>> {
    await import('./delete-troop-modal.module');
    return this.dialog.open(DeleteTroopModalComponent, {
      width: ModalWidths.MEDIUM,
      disableClose: true,
      autoFocus: false,
      data: {
        troops,
      } as DeleteTroopModalComponentEntry,
    });
  }
}
