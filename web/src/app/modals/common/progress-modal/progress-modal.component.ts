import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { forkJoin, Observable } from 'rxjs';
import { Results } from 'src/app/utils/Result';

export interface ProgressModalData {
  response: Observable<any>[];
  options?: Options;
}

export interface Options {
  successMessage?: string;
  failureMessage?: string;
  autoClose?: MatDialogRef<any>;
}

@Component({
  selector: 'app-progress-modal',
  templateUrl: './progress-modal.component.html',
  styleUrls: ['./progress-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressModalComponent implements OnInit {
  Results = Results;
  result: Results;

  pageLoaded = false;
  tasks: Observable<boolean>[];

  error: HttpErrorResponse;

  failureMessage: string;
  successMessage: string;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private dialogRef: MatDialogRef<ProgressModalComponent>,

    @Inject(MAT_DIALOG_DATA) public data: ProgressModalData
  ) {
    this.failureMessage = data.options?.failureMessage;
    this.successMessage = data.options?.successMessage;
    this.tasks = data.response;
  }

  ngOnInit(): void {
    if (this.tasks) {
      this.processBoolean(this.tasks);
    }
  }

  // FUNCTIONALITIES

  close(): void {
    this.dialogRef.close(this.result);
  }

  // UTILS

  processBoolean(tasks: Observable<boolean>[]): void {
    forkJoin(tasks).subscribe({
      next: (x) => {
        let checkAll = true;

        x.forEach((callback) => {
          if (!callback) {
            checkAll = false;
          }
        });

        if (checkAll === true) {
          this.result = Results.SUCCESS;
        } else if (checkAll === false) {
          this.result = Results.FAILURE;
        } else {
          this.result = Results.FAILURE;
        }

        this.pageLoaded = true;
        this.changeDetector.detectChanges();
      },
      error: (err) => {
        this.result = Results.ERROR;
        this.error = err;

        this.pageLoaded = true;
        this.changeDetector.detectChanges();
      },
    });
  }
}
