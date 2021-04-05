import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Scout } from 'src/app/model/Scout';
import { Team } from 'src/app/model/Team';
import { ScoutsService } from 'src/app/services/scouts.service';
import { TeamsService } from 'src/app/services/teams.service';
import { Results } from 'src/app/utils/Result';
import { ProgressModal } from '../../common/progress-modal/ProgressModal';

export interface DeleteScoutModalComponentEntry {
  scouts: Scout[];
}

@Component({
  selector: 'app-delete-team-modal',
  templateUrl: './delete-scout-modal.component.html',
  styleUrls: ['./delete-scout-modal.component.scss'],
})
export class DeletScoutModalComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  pageLoaded = false;

  scouts: Scout[];
  accept = false;

  constructor(
    private scoutsService: ScoutsService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<DeletScoutModalComponent>,

    @Inject(MAT_DIALOG_DATA) data: DeleteScoutModalComponentEntry
  ) {
    this.scouts = data.scouts;
  }

  ngOnInit(): void {
    this.pageLoaded = true;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  // FUNCTIONALITIES

  close(): void {
    this.dialogRef.close(Results.CANCEL);
  }

  delete(): void {
    const queue = [] as Observable<boolean>[];
    this.scouts
      .map((x) => x.scoutId)
      .forEach((id) => {
        queue.push(this.scoutsService.deleteScout(id));
      });
    new ProgressModal(this.dialog)
      .open(queue, {
        successMessage: 'Udało usunąć harcerzy',
        failureMessage: 'Nie udało usunąć harcerzy',
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
