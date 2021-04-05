import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Scout } from 'src/app/model/Scout';
import { ModalWidths } from '../../Modals-def';
import {
  DeleteScoutModalComponentEntry,
  DeletScoutModalComponent,
} from './delete-scout-modal.component';

export class DeleteScoutModal {
  constructor(private dialog: MatDialog) {}

  async open(scouts: Scout[]): Promise<MatDialogRef<DeletScoutModalComponent>> {
    await import('./delete-scout-modal.module');
    return this.dialog.open(DeletScoutModalComponent, {
      width: ModalWidths.MEDIUM,
      disableClose: true,
      data: {
        scouts,
      } as DeleteScoutModalComponentEntry,
    });
  }
}
