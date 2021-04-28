import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Journey } from 'src/app/model/Journey';
import { Meeting } from 'src/app/model/Meeting';
import { Role } from 'src/app/model/Role';
import { Scout } from 'src/app/model/Scout';
import { ModalWidths } from '../../Modals-def';
import {
  ExportCsvMeetingJourneyModalComponent,
  ExportCsvMeetingJourneyModalComponentEntry,
} from './export-csv-meeting-journey-modal.component';

export class ExportCsvMeetingJourneyModal {
  constructor(private dialog: MatDialog) {}

  async open(data: {
    meetings?: Meeting[];
    journeys?: Journey[];
  }): Promise<MatDialogRef<ExportCsvMeetingJourneyModalComponent>> {
    await import('./export-csv-meeting-journey-modal.module');
    return this.dialog.open(ExportCsvMeetingJourneyModalComponent, {
      width: ModalWidths.MEDIUM,
      disableClose: true,
      data: {
        meetings: data.meetings ? data.meetings : [],
        journeys: data.journeys ? data.journeys : [],
      } as ExportCsvMeetingJourneyModalComponentEntry,
    });
  }
}
