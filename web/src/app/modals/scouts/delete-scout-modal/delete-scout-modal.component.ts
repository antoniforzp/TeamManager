import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Scout } from 'src/app/model/data/Scout';
import { ScoutsService } from 'src/app/services/data/scouts.service';
import { Results } from 'src/app/utils/Result';
import { EntryRequestData } from '../../common/progress-modal/progress-modal.component';
import { ProgressModal } from '../../common/progress-modal/ProgressModal';

export interface DeleteScoutModalComponentEntry {
  scouts: Scout[];
}

@Component({
  selector: 'app-delete-team-modal',
  templateUrl: './delete-scout-modal.component.html',
  styleUrls: ['./delete-scout-modal.component.scss'],
})
export class DeleteScoutModalComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  pageLoaded = false;

  scouts: Scout[];
  accept = false;

  constructor(
    private scoutsService: ScoutsService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<DeleteScoutModalComponent>,

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
    const queue = [] as EntryRequestData[];
    this.scouts
      .map((x) => x.scoutId)
      .forEach((id) => {
        queue.push({
          request: this.scoutsService.deleteScout(id),
          requestLabel: 'requests.delete-scout',
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
