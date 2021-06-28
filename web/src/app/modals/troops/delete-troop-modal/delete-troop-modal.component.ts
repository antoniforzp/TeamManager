import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ScoutsService } from 'src/app/services/data/scouts.service';
import { PatrolsService } from 'src/app/services/data/patrols.service';
import { Results } from 'src/app/utils/Result';
import { EntryRequestData } from '../../common/progress-modal/progress-modal.component';
import { ProgressModal } from '../../common/progress-modal/ProgressModal';
import { Patrol } from 'src/app/model/data/Patrol';
import { Scout } from 'src/app/model/data/Scout';

export interface DeleteTroopModalComponentEntry {
  troops: Patrol[];
}

@Component({
  templateUrl: './delete-troop-modal.component.html',
  styleUrls: ['./delete-troop-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteTroopModalComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  pageLoaded = false;
  pageError: HttpErrorResponse;

  troops: Patrol[];
  scouts: Scout[];
  accept = false;

  constructor(
    private troopsService: PatrolsService,
    private scoutsService: ScoutsService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<DeleteTroopModalComponent>,
    private changeDetector: ChangeDetectorRef,

    @Inject(MAT_DIALOG_DATA) data: DeleteTroopModalComponentEntry
  ) {
    this.troops = data.troops;
  }

  ngOnInit(): void {
    this.scoutsService
      .getScouts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (scouts) => {
          this.scouts = scouts.filter((x) =>
            this.troops.find((t) => t.patrolId === x.patrol.patrolId)
          );

          this.pageLoaded = true;
          this.changeDetector.detectChanges();
        },
        error: (err) => {
          this.pageError = err;
          this.pageLoaded = true;
          this.changeDetector.detectChanges();
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  // FUNCTIONALITIES

  close(): void {
    this.dialogRef.close(Results.CANCEL);
  }

  delete(): void {
    const queue = [] as EntryRequestData[];
    this.troops
      .map((x) => x.patrolId)
      .forEach((id) => {
        queue.push({
          request: this.troopsService.deletePatrol(id),
          requestLabel: 'requests.delete-patrol',
        });
      });
    new ProgressModal(this.dialog).open(queue).then((x) =>
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
