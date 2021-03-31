import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Results } from 'src/app/utils/Result';

@Component({
  templateUrl: './logout-modal.component.html',
  styleUrls: ['./logout-modal.component.scss'],
})
export class LogoutModalComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<LogoutModalComponent>) {}

  ngOnInit(): void {}

  // FUNCTIONALITIES

  logout(): void {
    this.dialogRef.close(Results.SUCCESS);
  }

  cancel(): void {
    this.dialogRef.close(Results.CANCEL);
  }
}
