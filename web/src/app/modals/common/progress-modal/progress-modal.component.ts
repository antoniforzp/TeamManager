import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Results } from 'src/app/utils/Result';

export interface ProgressModalData {
  response: Observable<any>;
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
  task: Observable<boolean>;

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
    this.task = data.response;
  }

  ngOnInit(): void {
    if (this.task) {
      this.processBoolean(this.task);
    }
  }

  // FUNCTIONALITIES

  close(): void {
    this.dialogRef.close(this.result);
  }

  // UTILS

  processBoolean(task: Observable<boolean>): void {
    task.subscribe({
      next: (x) => {
        if (x === true) {
          this.result = Results.SUCCESS;
        } else if (x === false) {
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
