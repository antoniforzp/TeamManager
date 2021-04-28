import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { Journey } from 'src/app/model/Journey';
import { Meeting } from 'src/app/model/Meeting';
import {
  CSVExporter,
  MeetingJourneyCsvPayload,
} from 'src/app/utils/CSVExporter';
import { Results } from 'src/app/utils/Result';

export interface ExportCsvMeetingJourneyModalComponentEntry {
  meetings: Meeting[];
  journeys: Journey[];
}

@Component({
  templateUrl: './export-csv-meeting-journey-modal.component.html',
  styleUrls: ['./export-csv-meeting-journey-modal.component.scss'],
})
export class ExportCsvMeetingJourneyModalComponent
  implements OnInit, OnDestroy {
  destroy$ = new Subject();
  pageLoaded = false;

  meetings: Meeting[];
  journeys: Journey[];

  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ExportCsvMeetingJourneyModalComponent>,
    private fb: FormBuilder,

    @Inject(MAT_DIALOG_DATA) data: ExportCsvMeetingJourneyModalComponentEntry
  ) {
    this.meetings = data.meetings;
    this.journeys = data.journeys;
  }

  ngOnInit(): void {
    this.setupForm();
    this.pageLoaded = true;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  // FUNCTIONALITIES

  close(): void {
    this.dialogRef.close(Results.CANCEL);
  }

  export(): void {
    const headers = [] as string[];
    const exportPayloads = [] as MeetingJourneyCsvPayload[];

    headers.push('Title');
    headers.push('Start date');
    if (this.journeys.length > 0) {
      headers.push('End date');
    }

    this.meetings.forEach((meeting) => {
      const exportPayload = {} as MeetingJourneyCsvPayload;

      exportPayload.title = meeting.title;
      exportPayload.date = meeting.date;
      exportPayload.endDate = null;

      exportPayloads.push(exportPayload);
    });

    this.journeys.forEach((journey) => {
      const exportPayload = {} as MeetingJourneyCsvPayload;

      exportPayload.title = journey.title;
      exportPayload.date = journey.startDate;
      exportPayload.endDate = journey.endDate;

      exportPayloads.push(exportPayload);
    });

    new CSVExporter().exportAndDownlaod(
      this.filename.value + '.csv',
      exportPayloads,
      headers
    );
  }

  // UTILS

  generatedFilename(): string {
    const date = new Date();
    return 'Meetings_Journeys_list_' + date.toLocaleDateString('en-US');
  }

  // FORM SETUP

  setupForm(): void {
    this.form = this.fb.group({
      filename: [this.generatedFilename(), [Validators.required]],
      exportAll: [true, [Validators.required]],
      exportCredentials: [true, [Validators.required]],
      exportAddress: [true, [Validators.required]],
      exportContact: [true, [Validators.required]],
      exportRanks: [true, [Validators.required]],
      exportAfiliation: [true, [Validators.required]],
    });
  }

  // FORMS

  get filename(): AbstractControl {
    return this.form.get('filename');
  }
}
