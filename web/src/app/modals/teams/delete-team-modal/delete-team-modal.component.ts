import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Team } from 'src/app/model/Team';
import { TeamsService } from 'src/app/services/data/teams.service';
import { Results } from 'src/app/utils/Result';
import { EntryRequestData } from '../../common/progress-modal/progress-modal.component';
import { ProgressModal } from '../../common/progress-modal/ProgressModal';
import { AddEditTeamModalComponent } from '../add-edit-team-modal/add-edit-team-modal.component';

export interface DeleteTeamModalComponentEntry {
  teams: Team[];
}

@Component({
  selector: 'app-delete-team-modal',
  templateUrl: './delete-team-modal.component.html',
  styleUrls: ['./delete-team-modal.component.scss'],
})
export class DeleteTeamModalComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();

  teams: Team[];
  accept = false;

  constructor(
    private teamsService: TeamsService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<AddEditTeamModalComponent>,

    @Inject(MAT_DIALOG_DATA) data: DeleteTeamModalComponentEntry
  ) {
    this.teams = data.teams;
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
    this.teams
      .map((x) => x.teamId)
      .forEach((id) => {
        queue.push({
          request: this.teamsService.deleteTeam(id),
          requestLabel: 'usuwanie drużyny',
        });
      });

    new ProgressModal(this.dialog)
      .open(queue, {
        successMessage: 'Udało usunąć wybrane drużyny',
        failureMessage: 'Nie Udało usunąć wybranyc drużyn',
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
