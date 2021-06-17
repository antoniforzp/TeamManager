import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  concat,
  Observable,
} from 'rxjs';
import { Results } from 'src/app/utils/Result';

export interface EntryRequestData {
  request: Observable<boolean>;
  requestLabel: string;
}

interface RequestData {
  index: number;
  request: Observable<boolean>;
  requestLabel: string;
}

export interface ProgressModalData {
  requests: RequestData[];
  options?: Options;
}

export interface Options {
  successMessage?: string;
  failureMessage?: string;
  autoClose?: MatDialogRef<any>;
}

interface ResultData {
  action: string;
  elapsedTime: number;
  result: ActionResults;
  errorDescription?: string;
}

enum ActionResults {
  SUCCESS,
  FAILURE,
  SERVER_ERROR,
}

@Component({
  selector: 'app-progress-modal',
  templateUrl: './progress-modal.component.html',
  styleUrls: ['./progress-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressModalComponent implements OnInit {
  Results = Results;
  result: Results = Results.SUCCESS;

  pageLoaded = false;
  requests: RequestData[] = [];

  error: HttpErrorResponse;

  failureMessage: string;
  successMessage: string;

  ActionResults = ActionResults;
  checkAll = true;
  resultData = [] as ResultData[];

  constructor(
    private changeDetector: ChangeDetectorRef,
    private dialogRef: MatDialogRef<ProgressModalComponent>,

    @Inject(MAT_DIALOG_DATA) public data: ProgressModalData
  ) {
    this.failureMessage = data.options?.failureMessage;
    this.successMessage = data.options?.successMessage;

    let index = 0;
    this.requests = data.requests.map((x) => {
      return {
        index: index++,
        request: x.request,
        requestLabel: x.requestLabel,
      } as RequestData;
    });
  }

  ngOnInit(): void {
    if (this.requests) {
      this.processBoolean(this.requests.map((x) => x.request));
    }
  }

  // FUNCTIONALITIES

  close(): void {
    this.dialogRef.close(this.result);
  }

  // UTILS

  processBoolean(tasks: Observable<boolean>[]): void {
    this.started();

    let index = 0;
    const startTime = performance.now();

    concat(...tasks).subscribe({
      next: (x) => {
        this.registerTask(index++, x, startTime);
      },
      error: (err: HttpErrorResponse) => {
        this.registerError(index++, err.message, startTime);
        this.result = Results.FAILURE;
        this.finished();
      },
      complete: () => {
        this.finished();
      },
    });
  }

  // RESULT HANDLING

  private registerTask(
    index: number,
    result: boolean,
    startTime: number
  ): void {
    setTimeout(() => {
      const elapsedTime = Math.round((performance.now() - startTime) * 10) / 10;
      this.resultData.push({
        action: this.requests.find((x) => x.index === index).requestLabel,
        elapsedTime,
        result: result ? ActionResults.SUCCESS : ActionResults.FAILURE,
      });

      // If any task fails, mark as failed
      if (!result) {
        this.result = Results.FAILURE;
      }

      this.changeDetector.detectChanges();
    }, 1);
  }

  private registerError(
    index: number,
    errorDesc: string,
    startTime: number
  ): void {
    setTimeout(() => {
      const elapsedTime = Math.round((performance.now() - startTime) * 10) / 10;
      this.resultData.push({
        action: this.requests.find((x) => x.index === index).requestLabel,
        elapsedTime,
        result: ActionResults.SERVER_ERROR,
        errorDescription: errorDesc,
      });

      this.changeDetector.detectChanges();
    }, 1);
  }

  private started(): void {
    this.pageLoaded = false;
    this.changeDetector.detectChanges();
  }

  private finished(): void {
    this.pageLoaded = true;
    this.changeDetector.detectChanges();
  }
}
