import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import {
  Options,
  ProgressModalComponent,
  ProgressModalData,
} from './progress-modal.component';

export class ProgressModal {
  constructor(private dialog: MatDialog) {}

  open<T>(
    response: Observable<T>,
    options?: Options
  ): MatDialogRef<ProgressModalComponent> {
    return this.dialog.open(ProgressModalComponent, {
      width: '30%',
      disableClose: true,
      data: {
        response,
        options,
      } as ProgressModalData,
    });
  }
}
