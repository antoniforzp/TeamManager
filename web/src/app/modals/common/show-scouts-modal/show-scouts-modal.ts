import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Scout } from 'src/app/model/Scout';
import { ModalWidths } from '../../Modals-def';
import {
  ShowScoutsModalComponent,
  ShowScoutsModalComponentEntry,
} from './show-scouts-modal.component';

export class ShowScoutsModal {
  constructor(private dialog: MatDialog) {}

  async open(scouts: Scout[]): Promise<MatDialogRef<ShowScoutsModalComponent>> {
    await import('./show-scouts-modal.module');
    return this.dialog.open(ShowScoutsModalComponent, {
      width: ModalWidths.WIDE,
      disableClose: true,
      autoFocus: false,
      data: {
        scoutsData: scouts,
      } as ShowScoutsModalComponentEntry,
    });
  }
}