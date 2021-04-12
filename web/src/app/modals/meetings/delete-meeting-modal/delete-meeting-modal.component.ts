import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Meeting } from 'src/app/model/Meeting';
import { Team } from 'src/app/model/Team';
import { MeetingsService } from 'src/app/services/meetings.service';
import { TeamsService } from 'src/app/services/teams.service';
import { Results } from 'src/app/utils/Result';
import { ProgressModal } from '../../common/progress-modal/ProgressModal';

export interface DeleteMeetingModalComponentEntry {
  meetings: Meeting[];
}

@Component({
  selector: 'app-delete-team-modal',
  templateUrl: './delete-meeting-modal.component.html',
  styleUrls: ['./delete-meeting-modal.component.scss'],
})
export class DeleteMeetingModalComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();

  meetings: Meeting[];
  accept = false;

  constructor(
    private meetingsService: MeetingsService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<DeleteMeetingModalComponent>,

    @Inject(MAT_DIALOG_DATA) data: DeleteMeetingModalComponentEntry
  ) {
    this.meetings = data.meetings;
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
    const queue = [] as Observable<boolean>[];
    this.meetings
      .map((x) => x.meetingId)
      .forEach((id) => {
        queue.push(this.meetingsService.deleteMeeting(id));
      });

    new ProgressModal(this.dialog)
      .open(queue, {
        successMessage: 'Udało usunąć wybrane zbiórki',
        failureMessage: 'Nie Udało usunąć wybranych zbiórek',
      })
      .then((x) =>
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
