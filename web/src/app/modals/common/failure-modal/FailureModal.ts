import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FailureModalComponent } from './failure-modal.component';

export class FailureModal {
  constructor(private dialog: MatDialog) {}

  open(): MatDialogRef<FailureModalComponent> {
    return this.dialog.open(FailureModalComponent, {
      width: '50%',
      disableClose: true,
    });
  }
}
