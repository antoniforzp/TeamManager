import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-progress-modal',
  templateUrl: './progress-modal.component.html',
  styleUrls: ['./progress-modal.component.scss'],
})
export class ProgressModalComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ProgressModalComponent>) {}

  ngOnInit(): void {}

  close(): void {
    this.dialogRef.close();
  }

  process<T>(observable: Observable<T>): void {
    observable.subscribe({
      next: (x) => {
        return of(x);
      },
      error: (err) => {
        return of(undefined);
      },
    });
  }
}
