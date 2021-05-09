import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Language } from 'src/app/model/Language';
import { Settings } from 'src/app/model/Settings';
import { AppSettingsService } from 'src/app/services/core/app-settings.service';
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
  settings: Settings;

  // Selected options
  selectedLanguage: Language;

  constructor(
    private dialogRef: MatDialogRef<SettingsModalComponent>,
    private fb: FormBuilder,
    private changeDetector: ChangeDetectorRef,
    private settingsService: SettingsService,
    private appSettingsService: AppSettingsService,
    private translate: TranslateService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    forkJoin({
      languages: this.settingsService.getLanguages(),
      settings: this.settingsService.getSettings(),
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (result) => {
          this.languages = result.languages;
          this.settings = result.settings;

          this.selectedLanguage = this.settings.language;

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
      .open(
        [
          this.appSettingsService.patchSettings({
            userId: this.settings.userId,
            language: this.selectedLanguage,
          }),
        ],
        {
          successMessage: 'Udało się zmienić ustawienia',
          failureMessage: 'Nie się zmienić ustawień',
        }
      )
      .then((x) =>
        x
          .afterClosed()
          .pipe(takeUntil(this.destroy$))
          .subscribe((result) => {
            if (result === Results.SUCCESS) {
              this.translate.use(this.selectedLanguage.abbreviation as string);
              this.dialogRef.close(result);
            }
          })
      );
  }

  // SELECTION

  onLanguageChange(event: any): void {
    this.changes = true;
    this.selectedLanguage = this.languages.find(
      (x) => x.abbreviation === event
    );
    this.changeDetector.detectChanges();
  }

  // PLACEHOLDER FROMS

  setupForm(): void {
    this.form = this.fb.group({
      language: [this.selectedLanguage.abbreviation],
    });
  }

  get language(): AbstractControl {
    return this.form.get('language');
  }
}
