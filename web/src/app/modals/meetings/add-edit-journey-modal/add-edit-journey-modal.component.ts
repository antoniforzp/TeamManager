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
import { Journey } from 'src/app/model/Journey';
import { JourneysService } from 'src/app/services/data/journeys.service';
import { Results as Results } from 'src/app/utils/Result';
import { ProgressModal } from '../../common/progress-modal/ProgressModal';
import { ModalModes } from '../../Modals-def';

export interface AddEditJourneyModalComponentEntry {
  mode: ModalModes;
  journeyData?: Journey;
}

@Component({
  templateUrl: './add-edit-journey-modal.component.html',
  styleUrls: ['./add-edit-journey-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEditJourneyModalComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();

  ModalModes = ModalModes;
  modalMode: ModalModes;

  form: FormGroup;
  journeyData: Journey;

  constructor(
    private fb: FormBuilder,
    private journeysService: JourneysService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<AddEditJourneyModalComponent>,

    @Inject(MAT_DIALOG_DATA) data: AddEditJourneyModalComponentEntry
  ) {
    this.journeyData = data.journeyData;
    this.modalMode = data.mode;
  }

  ngOnInit(): void {
    this.setupForm();

    if (this.journeyData) {
      this.loadFormData(this.journeyData);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  // PATCHING FORM

  loadFormData(troop: Journey): void {
    this.form.patchValue({
      title: troop.title,
      place: troop.place,
      startDate: troop.startDate,
      endDate: troop.startDate,
    });
  }

  // FORM SETTING UP

  setupForm(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      place: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }

  // FUNCTIONALITIES

  close(): void {
    this.dialogRef.close(Results.CANCEL);
  }

  addJourney(): void {
    new ProgressModal(this.dialog)
      .open([
        {
          request: this.journeysService.addJourney({
            title: this.title.value,
            place: this.place.value,
            date: this.startDate.value,
            endDate: this.endDate.value,
          }),
          requestLabel: 'requests.add-journey',
        },
      ])
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

  editJourney(): void {
    new ProgressModal(this.dialog)
      .open([
        {
          request: this.journeysService.patchJourney(
            this.journeyData.journeyId,
            {
              title: this.title.value,
              place: this.place.value,
              date: this.startDate.value,
              endDate: this.endDate.value,
            }
          ),
          requestLabel: 'requests.edit-journey',
        },
      ])
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

  get startDate(): AbstractControl {
    return this.form.get('startDate');
  }

  get endDate(): AbstractControl {
    return this.form.get('endDate');
  }
}
