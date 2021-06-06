import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AppNavigationService } from 'src/app/services/core/app-navigation.service';
import { Results } from 'src/app/utils/Result';

@Component({
  templateUrl: './session-expired-modal.component.html',
  styleUrls: ['./session-expired-modal.component.scss'],
})
export class SessionExpiredModalComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<SessionExpiredModalComponent>,
    private appNavigationServie: AppNavigationService
  ) {}

  ngOnInit(): void {}

  // FUNCTIONALITIES

  logout(): void {
    this.appNavigationServie.navigateToLogin();
    this.dialogRef.close(Results.SUCCESS);
  }
}
