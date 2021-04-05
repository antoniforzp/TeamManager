import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Scout } from 'src/app/model/Scout';
import { ModalWidths } from '../../Modals-def';
import {
  DeleteScoutModalComponentEntry,
  DeleteScoutModalComponent,
} from './delete-scout-modal.component';

export class DeleteScoutModal {
  constructor(private dialog: MatDialog) {}

  async open(scouts: Scout[]): Promise<MatDialogRef<DeleteScoutModalComponent>> {
    await import('./delete-scout-modal.module');
    return this.dialog.open(DeleteScoutModalComponent, {
      width: ModalWidths.MEDIUM,
      disableClose: true,
      data: {
        scouts,
      } as DeleteScoutModalComponentEntry,
    });
  }
}
