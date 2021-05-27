import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Language } from 'src/app/model/Language';
import { Settings } from 'src/app/model/Settings';
import { Theme } from 'src/app/model/Theme';
import { AppSettingsService } from 'src/app/services/core/app-settings.service';
import { AppThemeService } from 'src/app/services/core/app-theme.service';
import { SettingsService } from 'src/app/services/data/settings.service';
import { Results } from 'src/app/utils/Result';
import { ProgressModal } from '../../common/progress-modal/ProgressModal';

@Component({
  templateUrl: './settings-modal.component.html',
  styleUrls: ['./settings-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsModalComponent implements OnInit {
  destroy$ = new Subject();
  pageLoaded = false;
  pageError: HttpErrorResponse;

  form: FormGroup;

  saved: boolean;
  changes: boolean;

  languages: Language[];
  themes: Theme[];
  settings: Settings;

  // Selected options
  selectedLanguage: Language;
  selectedTheme: Theme;

  constructor(
    private dialogRef: MatDialogRef<SettingsModalComponent>,
    private fb: FormBuilder,
    private changeDetector: ChangeDetectorRef,
    private settingsService: SettingsService,
    private appSettingsService: AppSettingsService,
    private appThemeService: AppThemeService,
    private translate: TranslateService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    forkJoin({
      languages: this.settingsService.getLanguages(),
      settings: this.settingsService.getSettings(),
      themes: this.settingsService.getThemes(),
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (result) => {
          this.languages = result.languages;
          this.settings = result.settings;
          this.themes = result.themes;

          this.selectedLanguage = this.settings.language;
          this.selectedTheme = this.settings.theme;

          this.setupForm();

          this.pageLoaded = true;
          this.changeDetector.detectChanges();
        },
        error: (err) => {
          this.pageError = err;
          this.pageLoaded = true;
          this.changeDetector.detectChanges();
        },
      });
  }

  // FUNCTIONALITIES

  cancel(): void {
    this.dialogRef.close(this.saved ? Results.SUCCESS : Results.CANCEL);
  }

  save(): void {
    new ProgressModal(this.dialog)
      .open([
        {
          request: this.appSettingsService.patchSettings({
            userId: this.settings.userId,
            language: this.selectedLanguage,
            theme: this.selectedTheme,
          }),
          requestLabel: 'requests.edit-settings',
        },
      ])
      .then((x) =>
        x
          .afterClosed()
          .pipe(takeUntil(this.destroy$))
          .subscribe((result) => {
            if (result === Results.SUCCESS) {
              this.translate.use(this.selectedLanguage.languageId as string);
              this.appThemeService.setThemeById(this.selectedTheme.themeId);
              this.dialogRef.close(result);
            }
          })
      );
  }

  // SELECTION

  onLanguageChange(event: any): void {
    this.changes = true;
    this.selectedLanguage = this.languages.find(
      (x) => x.languageId === event
    );
    this.changeDetector.detectChanges();
  }

  onThemeChange(event: any): void {
    this.changes = true;
    this.selectedTheme = this.themes.find((x) => x.abbreviation === event);
    this.changeDetector.detectChanges();
  }

  // PLACEHOLDER FROMS

  setupForm(): void {
    this.form = this.fb.group({
      language: [this.selectedLanguage.languageId],
      theme: [this.selectedTheme.abbreviation],
    });
  }

  get language(): AbstractControl {
    return this.form.get('language');
  }

  get theme(): AbstractControl {
    return this.form.get('theme');
  }
}
