import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Journey } from 'src/app/model/Journey';
import { Meeting } from 'src/app/model/Meeting';
import { ModalWidths } from '../../Modals-def';
import {
  ManageMeetingPresenceComponent,
  ManageMeetingPresenceComponentEntry,
  Modes,
} from './manage-meeting-presence-modal.component';

export class ManageMeetingPresenceModal {
  constructor(private dialog: MatDialog) {}

  async open(
    data: {
      meeting?: Meeting;
      journey?: Journey;
    },
    mode: Modes
  ): Promise<MatDialogRef<ManageMeetingPresenceComponent>> {
    await import('./manage-meeting-presence-modal.module');
    return this.dialog.open(ManageMeetingPresenceComponent, {
      width: ModalWidths.MEDIUM,
      disableClose: true,
      data: {
        mode,
        meeting: data.meeting,
        journey: data.journey,
      } as ManageMeetingPresenceComponentEntry,
    });
  }
}
