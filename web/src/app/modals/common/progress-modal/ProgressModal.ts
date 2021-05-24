import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalWidths } from '../../Modals-def';
import {
  Options,
  ProgressModalComponent,
  ProgressModalData,
  EntryRequestData,
} from './progress-modal.component';

export class ProgressModal {
  constructor(private dialog: MatDialog) {}

  async open<T>(
    requests: EntryRequestData[],
    options?: Options
  ): Promise<MatDialogRef<ProgressModalComponent>> {
    await import('./progress-modal.module');
    return this.dialog.open(ProgressModalComponent, {
      width: ModalWidths.MEDIUM,
      disableClose: true,
      data: {
        requests,
        options,
      } as ProgressModalData,
    });
  }
}
