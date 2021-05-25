import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalWidths } from '../../Modals-def';
import { PatrolsInfoModalComponent } from './patrols-info-modal.component';

export class PatrolsInfoModal {
  constructor(private dialog: MatDialog) {}

  async open(): Promise<MatDialogRef<PatrolsInfoModalComponent>> {
    await import('./patrols-info-modal.module');
    return this.dialog.open(PatrolsInfoModalComponent, {
      width: ModalWidths.MEDIUM,
      disableClose: true,
    });
  }
}
