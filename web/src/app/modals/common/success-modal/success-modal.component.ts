import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.scss'],
})
export class SuccessModalComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<SuccessModalComponent>) {}

  ngOnInit(): void {}

  close(): void {
    this.dialogRef.close();
  }
}
