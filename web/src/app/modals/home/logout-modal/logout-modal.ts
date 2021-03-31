import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalWidths } from '../../Modals-def';
import { LogoutModalComponent } from './logout-modal.component';

export class LogoutModal {
  constructor(private dialog: MatDialog) {}

  async open(): Promise<MatDialogRef<LogoutModalComponent>> {
    await import('./logout-modal.module');
    return this.dialog.open(LogoutModalComponent, {
      width: ModalWidths.SMALL,
      disableClose: true,
    });
  }
}
