import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Journey } from 'src/app/model/Journey';
import { Meeting } from 'src/app/model/Meeting';
import { Results } from 'src/app/utils/Result';

export enum MeetingJourneyIndicator {
  MEETING,
  JOURNEY,
}

export interface MeetingInfoModalComponentEntry {
  data: Journey | Meeting;
  indicator: MeetingJourneyIndicator;
}

interface MeetingInfo {
  title: string;
  place: string;
  startDate: Date;
  endDate?: Date;
  description?: string;
}

@Component({
  templateUrl: './meeting-info-modal.component.html',
  styleUrls: ['./meeting-info-modal.component.scss'],
})
export class MeetingInfoModalComponent implements OnInit {
  infoData: MeetingInfo;

  constructor(
    private dialogRef: MatDialogRef<MeetingInfoModalComponent>,

    @Inject(MAT_DIALOG_DATA) data: MeetingInfoModalComponentEntry
  ) {
    switch (data.indicator) {
      case MeetingJourneyIndicator.MEETING:
        {
          this.createMeetingData(data.data as Meeting);
        }
        break;

      case MeetingJourneyIndicator.JOURNEY:
        {
          this.createJourneyData(data.data as Journey);
        }
        break;
    }
  }

  ngOnInit(): void {}

  createMeetingData(meeting: Meeting): void {
    this.infoData = {
      title: meeting.title,
      place: meeting.place,
      startDate: meeting.date,
      description: meeting.description,
    };
  }

  createJourneyData(journey: Journey): void {
    this.infoData = {
      title: journey.title,
      place: journey.place,
      startDate: journey.startDate,
      endDate: journey.endDate,
      description: journey.description,
    };
  }

  // FUNCTIONALITIES

  close(): void {
    this.dialogRef.close(Results.CANCEL);
  }
}
