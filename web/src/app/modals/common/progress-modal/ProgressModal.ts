import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ModalWidths } from '../../Modals-def';
import {
  Options,
  ProgressModalComponent,
  ProgressModalData,
} from './progress-modal.component';

export class ProgressModal {
  constructor(private dialog: MatDialog) {}

  async open<T>(
    response: Observable<T>[],
    options?: Options
  ): Promise<MatDialogRef<ProgressModalComponent>> {
    await import('./progress-modal.module');
    return this.dialog.open(ProgressModalComponent, {
      width: ModalWidths.MEDIUM,
      disableClose: true,
      data: {
        response,
        options,
      } as ProgressModalData,
    });
  }
}
