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
import { Troop } from 'src/app/model/Troop';
import { TroopsService } from 'src/app/services/data/troops.service';
import { Results as Results } from 'src/app/utils/Result';
import { ProgressModal } from '../../common/progress-modal/ProgressModal';
import { ModalModes } from '../../Modals-def';

export interface AddEditTroopModalComponentEntry {
  mode: ModalModes;
  troopData?: Troop;
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
  troopData: Troop;

  constructor(
    private fb: FormBuilder,
    private troopsService: TroopsService,
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

  loadFormData(troop: Troop): void {
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

  addTeam(): void {
    new ProgressModal(this.dialog)
      .open([this.troopsService.addTroop(this.name.value)], {
        successMessage: 'Udało się dodać zastęp',
        failureMessage: 'Nie udało się dodać zastępu',
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

  editTeam(): void {
    new ProgressModal(this.dialog)
      .open(
        [
          this.troopsService.patchTroop(
            this.troopData.troopId,
            this.name.value
          ),
        ],
        {
          successMessage: 'Udało się zaktualizować dane zastępu',
          failureMessage: 'Nie udało się zaktualizować danych zastępu',
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

  get name(): AbstractControl {
    return this.form.get('name');
  }
}
