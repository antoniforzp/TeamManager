import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Meeting } from 'src/app/model/data/Meeting';
import { ModalModes, ModalWidths } from '../../Modals-def';
import {
  AddEditMeetingModalComponent,
  AddEditMeetingModalComponentEntry,
} from './add-edit-meeting-modal.component';

export class AddEditMeetigModal {
  constructor(private dialog: MatDialog) {}

  async openAdd(): Promise<MatDialogRef<AddEditMeetingModalComponent>> {
    await import('./add-edit-meeting-modal.module');
    return this.dialog.open(AddEditMeetingModalComponent, {
      width: ModalWidths.MEDIUM,
      disableClose: true,
      data: {
        mode: ModalModes.ADD,
      } as AddEditMeetingModalComponentEntry,
    });
  }

  async openEdit(
    meeting: Meeting
  ): Promise<MatDialogRef<AddEditMeetingModalComponent>> {
    await import('./add-edit-meeting-modal.module');
    return this.dialog.open(AddEditMeetingModalComponent, {
      width: ModalWidths.MEDIUM,
      disableClose: true,
      data: {
        mode: ModalModes.EDIT,
        meetingData: meeting,
      } as AddEditMeetingModalComponentEntry,
    });
  }
}
