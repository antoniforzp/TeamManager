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
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Scout } from 'src/app/model/Scout';
import { Troop } from 'src/app/model/Troop';
import { ScoutsService } from 'src/app/services/scouts.service';
import { TroopsService } from 'src/app/services/troops.service';
import { Results } from 'src/app/utils/Result';
import { ProgressModal } from '../../common/progress-modal/ProgressModal';

export interface DeleteTroopModalComponentEntry {
  troops: Troop[];
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

  troops: Troop[];
  scouts: Scout[];
  accept = false;

  constructor(
    private troopsService: TroopsService,
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
            this.troops.find((t) => t.troopId === x.troop.troopId)
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
    const queue = [] as Observable<boolean>[];
    this.troops
      .map((x) => x.troopId)
      .forEach((id) => {
        queue.push(this.troopsService.deleteTroop(id));
      });
    new ProgressModal(this.dialog)
      .open(queue, {
        successMessage: 'Udało usunąć wybrane zastępy',
        failureMessage: 'Nie Udało usunąć wybrane zastępy',
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
