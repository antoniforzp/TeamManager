import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Result } from 'src/app/utils/Result';

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
  Result = Result;
  result: Result = Result.Success;
  isLoadng = true;
  observable!: Observable<boolean>;

  autoClose: MatDialogRef<any> | undefined;
  failureMessage: string | undefined;
  successMessage: string | undefined;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private dialogRef: MatDialogRef<ProgressModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProgressModalData
  ) {
    this.failureMessage = data.options?.failureMessage;
    this.successMessage = data.options?.successMessage;
    this.observable = data.response;
    this.autoClose = data.options?.autoClose;
  }

  ngOnInit(): void {
    if (this.observable) {
      this.processBoolean(this.observable);
    }
  }

  close(): void {
    this.dialogRef.close(this.result);
    if (this.autoClose) {
      this.autoClose.close(this.result);
    }
  }

  processBoolean(observable: Observable<boolean>): void {
    observable.subscribe({
      next: (x) => {
        if (x) {
          this.result = Result.Success;
          this.isLoadng = false;
        } else {
          this.result = Result.Failure;
          this.isLoadng = false;
        }
        this.changeDetector.detectChanges();
      },
      error: (err) => {
        this.result = Result.Success;
        this.failureMessage = err;
        this.isLoadng = false;
        this.changeDetector.detectChanges();
      },
    });
  }
}
