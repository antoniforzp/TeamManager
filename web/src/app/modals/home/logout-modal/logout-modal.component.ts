import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { AppSettingsService } from 'src/app/services/core/app-settings.service';
import { AppThemeService } from 'src/app/services/core/app-theme.service';
import { Results } from 'src/app/utils/Result';

@Component({
  templateUrl: './logout-modal.component.html',
  styleUrls: ['./logout-modal.component.scss'],
})
export class LogoutModalComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<LogoutModalComponent>,
    private appSettingsService: AppSettingsService,
    private appThemeService: AppThemeService
  ) {}

  ngOnInit(): void {}

  // FUNCTIONALITIES

  logout(): void {
    forkJoin({
      settings: this.appSettingsService.clearOnLogout(),
      theme: this.appThemeService.clearOnLogout(),
    }).subscribe((x) => {
      if (x) {
        this.dialogRef.close(Results.SUCCESS);
      }
    });
  }

  cancel(): void {
    this.dialogRef.close(Results.CANCEL);
  }
}
