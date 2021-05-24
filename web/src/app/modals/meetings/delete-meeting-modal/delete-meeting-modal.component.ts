import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Journey } from 'src/app/model/Journey';
import { Meeting } from 'src/app/model/Meeting';
import { JourneysService } from 'src/app/services/data/journeys.service';
import { MeetingsService } from 'src/app/services/data/meetings.service';
import { Results } from 'src/app/utils/Result';
import { EntryRequestData } from '../../common/progress-modal/progress-modal.component';
import { ProgressModal } from '../../common/progress-modal/ProgressModal';

export interface DeleteMeetingModalComponentEntry {
  meetings: Meeting[];
  journeys: Journey[];
}

@Component({
  templateUrl: './delete-meeting-modal.component.html',
  styleUrls: ['./delete-meeting-modal.component.scss'],
})
export class DeleteMeetingModalComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();

  meetings: Meeting[];
  journeys: Journey[];
  accept = false;

  constructor(
    private meetingsService: MeetingsService,
    private journeysService: JourneysService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<DeleteMeetingModalComponent>,

    @Inject(MAT_DIALOG_DATA) data: DeleteMeetingModalComponentEntry
  ) {
    this.meetings = data.meetings;
    this.journeys = data.journeys;
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  // FUNCTIONALITIES

  close(): void {
    this.dialogRef.close(Results.CANCEL);
  }

  delete(): void {
    const queue = [] as EntryRequestData[];
    this.meetings
      .map((x) => x.meetingId)
      .forEach((id) => {
        queue.push({
          request: this.meetingsService.deleteMeeting(id),
          requestLabel: 'requests.delete-meeting',
        });
      });

    this.journeys
      .map((x) => x.journeyId)
      .forEach((id) => {
        queue.push({
          request: this.journeysService.deleteJourney(id),
          requestLabel: 'requests.delete-journey',
        });
      });

    new ProgressModal(this.dialog).open(queue).then((x) =>
      x
        .afterClosed()
        .pipe(takeUntil(this.destroy$))
        .subscribe((result) => {
          if (result === Results.SUCCESS) {
            this.dialogRef.close(result);
          }
        })
    );
  }
}
