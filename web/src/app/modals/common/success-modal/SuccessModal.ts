import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SuccessModalComponent } from './success-modal.component';

export class SuccessModal {
  constructor(private dialog: MatDialog) {}

  open(): MatDialogRef<SuccessModalComponent> {
    return this.dialog.open(SuccessModalComponent, {
      width: '50%',
      disableClose: true,
    });
  }
}
