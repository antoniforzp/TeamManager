import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Meeting } from 'src/app/model/Meeting';
import { ModalWidths } from '../../Modals-def';
import {
  DeleteMeetingModalComponent,
  DeleteMeetingModalComponentEntry,
} from './delete-meeting-modal.component';

export class DeleteMeetingModal {
  constructor(private dialog: MatDialog) {}

  async open(
    meetings: Meeting[]
  ): Promise<MatDialogRef<DeleteMeetingModalComponent>> {
    await import('./delete-meeting-modal.module');
    return this.dialog.open(DeleteMeetingModalComponent, {
      width: ModalWidths.MEDIUM,
      disableClose: true,
      data: {
        meetings,
      } as DeleteMeetingModalComponentEntry,
    });
  }
}
