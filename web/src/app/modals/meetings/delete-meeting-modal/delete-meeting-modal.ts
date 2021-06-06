import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Journey } from 'src/app/model/data/Journey';
import { Meeting } from 'src/app/model/data/Meeting';
import { ModalWidths } from '../../Modals-def';
import {
  DeleteMeetingModalComponent,
  DeleteMeetingModalComponentEntry,
} from './delete-meeting-modal.component';

export class DeleteMeetingModal {
  constructor(private dialog: MatDialog) {}

  async open(data: {
    meetings: Meeting[];
    journeys: Journey[];
  }): Promise<MatDialogRef<DeleteMeetingModalComponent>> {
    await import('./delete-meeting-modal.module');
    return this.dialog.open(DeleteMeetingModalComponent, {
      width: ModalWidths.MEDIUM,
      disableClose: true,
      data: {
        meetings: data.meetings,
        journeys: data.journeys,
      } as DeleteMeetingModalComponentEntry,
    });
  }
}
