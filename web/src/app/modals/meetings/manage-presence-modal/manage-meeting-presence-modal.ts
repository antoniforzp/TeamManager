import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Meeting } from 'src/app/model/Meeting';
import { ModalWidths } from '../../Modals-def';
import {
  ManageMeetingPresenceComponent,
  ManageMeetingPresenceComponentEntry,
} from './manage-meeting-presence-modal.component';

export class ManageMeetingPresenceModal {
  constructor(private dialog: MatDialog) {}

  async open(
    meeting: Meeting
  ): Promise<MatDialogRef<ManageMeetingPresenceComponent>> {
    await import('./manage-meeting-presence-modal.module');
    return this.dialog.open(ManageMeetingPresenceComponent, {
      width: ModalWidths.MEDIUM,
      disableClose: true,
      data: {
        meeting,
      } as ManageMeetingPresenceComponentEntry,
    });
  }
}
