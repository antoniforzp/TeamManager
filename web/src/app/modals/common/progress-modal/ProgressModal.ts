import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import {
  Options,
  ProgressModalComponent,
  ProgressModalData,
} from './progress-modal.component';

export class ProgressModal {
  constructor(private dialog: MatDialog) {}

  async open<T>(
    response: Observable<T>,
    options?: Options
  ): Promise<MatDialogRef<ProgressModalComponent>> {
    await import('./progress-modal.module');
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
