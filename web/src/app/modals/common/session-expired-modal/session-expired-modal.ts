import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalWidths } from '../../Modals-def';
import { SessionExpiredModalComponent } from './session-expired-modal.component';

export class SessionExpiredModal {
  constructor(private dialog: MatDialog) {}

  async open(): Promise<MatDialogRef<SessionExpiredModalComponent>> {
    await import('./session-expired-modal.module');
    return this.dialog.open(SessionExpiredModalComponent, {
      width: ModalWidths.SMALL,
      disableClose: true,
    });
  }
}
