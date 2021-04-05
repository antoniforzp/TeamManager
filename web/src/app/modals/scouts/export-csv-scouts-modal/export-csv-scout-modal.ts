import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Scout } from 'src/app/model/Scout';
import { ModalWidths } from '../../Modals-def';
import {
  ExportCsvScoutModalComponent,
  ExportCsvScoutModalComponentEntry,
} from './export-csv-scout-modal.component';

export class ExportCsvScoutModal {
  constructor(private dialog: MatDialog) {}

  async open(
    scouts: Scout[]
  ): Promise<MatDialogRef<ExportCsvScoutModalComponent>> {
    await import('./export-csv-scout-modal.module');
    return this.dialog.open(ExportCsvScoutModalComponent, {
      width: ModalWidths.MEDIUM,
      disableClose: true,
      data: {
        scouts,
      } as ExportCsvScoutModalComponentEntry,
    });
  }
}
