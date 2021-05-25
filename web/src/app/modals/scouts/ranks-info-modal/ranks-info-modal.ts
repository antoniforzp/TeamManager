import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalWidths } from '../../Modals-def';
import { RanksInfoModalComponent } from './ranks-info-modal.component';

export class RanksInfoModal {
  constructor(private dialog: MatDialog) {}

  async open(): Promise<MatDialogRef<RanksInfoModalComponent>> {
    await import('./ranks-info-modal.module');
    return this.dialog.open(RanksInfoModalComponent, {
      width: ModalWidths.MEDIUM,
      disableClose: true,
    });
  }
}
