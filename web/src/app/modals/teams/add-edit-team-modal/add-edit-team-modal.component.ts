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
import { Team } from 'src/app/model/data/Team';
import { TeamsService } from 'src/app/services/data/teams.service';
import { Results as Results } from 'src/app/utils/Result';
import { ProgressModal } from '../../common/progress-modal/ProgressModal';
import { ModalModes } from '../../Modals-def';

export interface AddEditTeamModalComponentEntry {
  mode: ModalModes;
  teamData?: Team;
}

@Component({
  templateUrl: './add-edit-team-modal.component.html',
  styleUrls: ['./add-edit-team-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEditTeamModalComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();

  ModalModes = ModalModes;
  modalMode: ModalModes;

  form: FormGroup;
  teamData: Team;

  constructor(
    private fb: FormBuilder,
    private teamsService: TeamsService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<AddEditTeamModalComponent>,

    @Inject(MAT_DIALOG_DATA) data: AddEditTeamModalComponentEntry
  ) {
    this.teamData = data.teamData;
    this.modalMode = data.mode;
  }

  ngOnInit(): void {
    this.setupForm();

    if (this.teamData) {
      this.loadFormData(this.teamData);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  // PATCHING FORM

  loadFormData(team: Team): void {
    this.form.patchValue({
      name: team.name,
      patron: team.patron,
    });
  }

  // FORM SETTING UP

  setupForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      patron: [''],
    });
  }

  // FUNCTIONALITIES

  close(): void {
    this.dialogRef.close(Results.CANCEL);
  }

  addTeam(): void {
    new ProgressModal(this.dialog)
      .open([
        {
          request: this.teamsService.addTeam(
            this.name.value,
            this.patron.value
          ),
          requestLabel: 'requests.add-team',
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

  editTeam(): void {
    new ProgressModal(this.dialog)
      .open([
        {
          request: this.teamsService.patchTeam(
            this.teamData.teamId,
            this.name.value,
            this.patron.value
          ),
          requestLabel: 'requests.edit-team',
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

  get patron(): AbstractControl {
    return this.form.get('patron');
  }
}
