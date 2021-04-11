import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Meeting } from 'src/app/model/Meeting';
import { Troop } from 'src/app/model/Troop';
import { MeetingsService } from 'src/app/services/meetings.service';
import { TroopsService } from 'src/app/services/troops.service';
import { Results as Results } from 'src/app/utils/Result';
import { ProgressModal } from '../../common/progress-modal/ProgressModal';
import { ModalModes } from '../../Modals-def';

export interface AddEditMeetingModalComponentEntry {
  mode: ModalModes;
  meetingData?: Meeting;
}

@Component({
  templateUrl: './add-edit-meeting-modal.component.html',
  styleUrls: ['./add-edit-meeting-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEditMeetingModalComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();

  ModalModes = ModalModes;
  modalMode: ModalModes;

  form: FormGroup;
  meetingData: Meeting;

  constructor(
    private fb: FormBuilder,
    private meetingsService: MeetingsService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<AddEditMeetingModalComponent>,

    @Inject(MAT_DIALOG_DATA) data: AddEditMeetingModalComponentEntry
  ) {
    this.meetingData = data.meetingData;
    this.modalMode = data.mode;
  }

  ngOnInit(): void {
    this.setupForm();

    if (this.meetingData) {
      this.loadFormData(this.meetingData);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  // PATCHING FORM

  loadFormData(troop: Meeting): void {
    this.form.patchValue({
      title: troop.title,
      place: troop.place,
      date: troop.date,
    });
  }

  // FORM SETTING UP

  setupForm(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      place: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  // FUNCTIONALITIES

  close(): void {
    this.dialogRef.close(Results.CANCEL);
  }

  addMeeting(): void {
    new ProgressModal(this.dialog)
      .open(
        [
          this.meetingsService.addMeeting({
            title: this.title.value,
            place: this.place.value,
            date: this.date.value,
          }),
        ],
        {
          successMessage: 'Udało się dodać zbiórkę',
          failureMessage: 'Nie udało się dodać zbirki',
        }
      )
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

  editMeeting(): void {
    new ProgressModal(this.dialog)
      .open(
        [
          this.meetingsService.patchMeeting(this.meetingData.meetingId, {
            title: this.title.value,
            place: this.place.value,
            date: this.date.value,
          }),
        ],
        {
          successMessage: 'Udało się zaktualizować informacje o zbiórce',
          failureMessage: 'Nie udało się zedytować zbirki',
        }
      )
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

  // FORMS

  get title(): AbstractControl {
    return this.form.get('title');
  }

  get place(): AbstractControl {
    return this.form.get('place');
  }

  get date(): AbstractControl {
    return this.form.get('date');
  }
}
