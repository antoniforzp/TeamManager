import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProgressModalComponent } from './progress-modal.component';

export class ProgressModal {
  constructor(private dialog: MatDialog) {}

  open(): MatDialogRef<ProgressModalComponent> {
    return this.dialog.open(ProgressModalComponent, {
      width: '50%',
      disableClose: true,
    });
  }
}
