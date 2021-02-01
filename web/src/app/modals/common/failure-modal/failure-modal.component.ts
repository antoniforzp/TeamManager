import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-failure-modal',
  templateUrl: './failure-modal.component.html',
  styleUrls: ['./failure-modal.component.scss'],
})
export class FailureModalComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<FailureModalComponent>) {}

  ngOnInit(): void {}

  close(): void {
    this.dialogRef.close();
  }
}
