import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { Team } from 'src/app/model/Team';
import { TeamsService } from 'src/app/services/teams.service';
import { Result as Results } from 'src/app/utils/Result';
import { ProgressModal } from '../../common/progress-modal/ProgressModal';

export interface AddEditTeamModalComponentEntry {
  teamData?: Team;
}

@Component({
  selector: 'app-edit-team-modal',
  templateUrl: './add-edit-team-modal.component.html',
  styleUrls: ['./add-edit-team-modal.component.scss'],
})
export class AddEditTeamModalComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private teamsService: TeamsService,
    private changeDetector: ChangeDetectorRef,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<AddEditTeamModalComponent>
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  // FORM SETTING UP

  setupForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      patron: [''],
    });
  }

  // FORMS

  get name(): AbstractControl {
    return this.form.get('name');
  }

  get patron(): AbstractControl {
    return this.form.get('patron');
  }

  // FUNCTIONALITIES

  close(): void {
    this.dialogRef.close(Results.Cancel);
  }

  addTeam(): void {
    new ProgressModal(this.dialog)
      .open(this.teamsService.addTeam(this.name.value, this.patron.value), {
        successMessage: 'Udało się dodać drużynę',
        failureMessage: 'Nie udało się dodać drużyny',
      })
      .then((x) =>
        x.afterClosed().subscribe((result) => {
          if (result === Results.Success) {
            this.dialogRef.close(result);
          }
        })
      );
  }
}
