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
    private changeDetector: ChangeDetectorRef
  ) {}

  saved: boolean;
  changes: boolean;

  form: FormGroup;

  ngOnInit(): void {
    this.setupForm();
  }

  // FUNCTIONALITIES

  cancel(): void {
    this.dialogRef.close(this.saved ? Results.SUCCESS : Results.CANCEL);
  }

  save(): void {}

  // SETUP FORM

  setupForm(): void {
    this.form = this.fb.group({
      language: ['polish', [Validators.required]],
      theme: ['default', [Validators.required]],
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
