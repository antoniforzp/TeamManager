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
import { MatDialogRef } from '@angular/material/dialog';
import { Theme } from 'src/app/settings/theme/Theme';
import { ThemeService } from 'src/app/settings/theme/theme.service';
import { Results } from 'src/app/utils/Result';

@Component({
  templateUrl: './settings-modal.component.html',
  styleUrls: ['./settings-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsModalComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<SettingsModalComponent>,
    private fb: FormBuilder,
    private changeDetector: ChangeDetectorRef,
    private themeService: ThemeService
  ) {
    this.themes = this.themeService.getAvailableThemes();
  }

  saved: boolean;
  changes: boolean;

  form: FormGroup;

  themes: Theme[];

  ngOnInit(): void {
    this.setupForm();
  }

  // FUNCTIONALITIES

  setTheme(theme: Theme): void {
    this.themeService.setActiveTheme(theme);
  }

  cancel(): void {
    this.dialogRef.close(this.saved ? Results.SUCCESS : Results.CANCEL);
  }

  save(): void {
    this.themeService.setActiveTheme(this.theme.value);
    this.dialogRef.close(this.saved ? Results.SUCCESS : Results.CANCEL);
  }

  // SETUP FORM

  setupForm(): void {
    this.form = this.fb.group({
      language: ['polish', [Validators.required]],
      theme: [this.themeService.getActiveTheme(), [Validators.required]],
    });

    this.form.valueChanges.subscribe(() => {
      this.changes = true;
      this.changeDetector.detectChanges();
    });
  }

  // FORMS

  get language(): AbstractControl {
    return this.form.get('language');
  }

  get theme(): AbstractControl {
    return this.form.get('theme');
  }
}
