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
import { Patrol } from 'src/app/model/data/Patrol';
import { PatrolsService } from 'src/app/services/data/patrols.service';
import { Results as Results } from 'src/app/utils/Result';
import { ProgressModal } from '../../common/progress-modal/ProgressModal';
import { ModalModes } from '../../Modals-def';

export interface AddEditTroopModalComponentEntry {
  mode: ModalModes;
  troopData?: Patrol;
}

@Component({
  templateUrl: './add-edit-troop-modal.component.html',
  styleUrls: ['./add-edit-troop-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEditTroopModalComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();

  ModalModes = ModalModes;
  modalMode: ModalModes;

  form: FormGroup;
  troopData: Patrol;

  constructor(
    private fb: FormBuilder,
    private troopsService: PatrolsService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<AddEditTroopModalComponent>,

    @Inject(MAT_DIALOG_DATA) data: AddEditTroopModalComponentEntry
  ) {
    this.troopData = data.troopData;
    this.modalMode = data.mode;
  }

  ngOnInit(): void {
    this.setupForm();

    if (this.troopData) {
      this.loadFormData(this.troopData);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  // PATCHING FORM

  loadFormData(troop: Patrol): void {
    this.form.patchValue({
      name: troop.name,
    });
  }

  // FORM SETTING UP

  setupForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
    });
  }

  // FUNCTIONALITIES

  close(): void {
    this.dialogRef.close(Results.CANCEL);
  }

  addTroop(): void {
    new ProgressModal(this.dialog)
      .open([
        {
          request: this.troopsService.addPatrol(this.name.value),
          requestLabel: 'requests.add-patrol',
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

  editTroop(): void {
    new ProgressModal(this.dialog)
      .open([
        {
          request: this.troopsService.patchPatrols(
            this.troopData.patrolId,
            this.name.value
          ),
          requestLabel: 'requests.edit-patrol',
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

  get name(): AbstractControl {
    return this.form.get('name');
  }
}
