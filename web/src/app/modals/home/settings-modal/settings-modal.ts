import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalWidths } from '../../Modals-def';
import { SettingsModalComponent } from './settings-modal.component';

export class SettingsModal {
  constructor(private dialog: MatDialog) {}

  async open(): Promise<MatDialogRef<SettingsModalComponent>> {
    await import('./settings-modal.module');
    return this.dialog.open(SettingsModalComponent, {
      width: ModalWidths.MEDIUM,
      disableClose: true,
    });
  }
}
