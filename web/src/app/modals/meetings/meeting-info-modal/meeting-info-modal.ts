import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Journey } from 'src/app/model/Journey';
import { Meeting } from 'src/app/model/Meeting';
import { ModalWidths } from '../../Modals-def';
import {
  MeetingInfoModalComponent,
  MeetingInfoModalComponentEntry,
  MeetingJourneyIndicator,
} from './meeting-info-modal.component';

export class MeetingInfoModal {
  constructor(private dialog: MatDialog) {}

  async openJourney(
    journey: Journey
  ): Promise<MatDialogRef<MeetingInfoModalComponent>> {
    await import('./meeting-info-modal.module');
    return this.dialog.open(MeetingInfoModalComponent, {
      width: ModalWidths.MEDIUM,
      disableClose: true,
      data: {
        data: journey,
        indicator: MeetingJourneyIndicator.JOURNEY,
      } as MeetingInfoModalComponentEntry,
    });
  }

  async openMeeting(
    meeting: Meeting
  ): Promise<MatDialogRef<MeetingInfoModalComponent>> {
    await import('./meeting-info-modal.module');
    return this.dialog.open(MeetingInfoModalComponent, {
      width: ModalWidths.MEDIUM,
      disableClose: true,
      data: {
        data: meeting,
        indicator: MeetingJourneyIndicator.MEETING,
      } as MeetingInfoModalComponentEntry,
    });
  }
}
