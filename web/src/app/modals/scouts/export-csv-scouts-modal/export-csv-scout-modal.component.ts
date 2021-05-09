import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { Role } from 'src/app/model/Role';
import { Scout } from 'src/app/model/Scout';
import { CSVExporter, ScoutCsvPayload } from 'src/app/utils/CSVExporter';
import { Results } from 'src/app/utils/Result';

export interface ExportCsvScoutModalComponentEntry {
  scouts: Scout[];
  scoutRoles: { scoutId: number; roles: Role[] }[];
}

@Component({
  templateUrl: './export-csv-scout-modal.component.html',
  styleUrls: ['./export-csv-scout-modal.component.scss'],
})
export class ExportCsvScoutModalComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  pageLoaded = false;

  scouts: Scout[];
  scoutRoles: { scoutId: number; roles: Role[] }[];

  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ExportCsvScoutModalComponent>,
    private fb: FormBuilder,
    private translate: TranslateService,

    @Inject(MAT_DIALOG_DATA) data: ExportCsvScoutModalComponentEntry
  ) {
    this.scouts = data.scouts;
    this.scoutRoles = data.scoutRoles;
  }

  ngOnInit(): void {
    this.setupForm();
    this.pageLoaded = true;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  // FUNCTIONALITIES

  close(): void {
    this.dialogRef.close(Results.CANCEL);
  }

  export(): void {
    const headers = [] as string[];
    const exportPayloads = [] as ScoutCsvPayload[];

    headers.push('Name');
    headers.push('Surname');

    if (this.exportCredentials.value) {
      headers.push('Birth date');
      headers.push('PESEL');
    }

    if (this.exportAddress.value) {
      headers.push('Address');
    }

    if (this.exportContact.value) {
      headers.push('Phone');
    }

    if (this.exportRanks.value) {
      headers.push('Rank');
      headers.push('Instructor rank');
    }

    if (this.exportAfiliation.value) {
      headers.push('Troop');
      headers.push('Roles');
    }

    this.scouts.forEach((scout) => {
      const exportPayload = {} as ScoutCsvPayload;

      exportPayload.name = scout.name;
      exportPayload.surname = scout.surname;

      if (this.exportCredentials.value) {
        exportPayload.birthDate = scout.birthDate;
        exportPayload.pesel = scout.pesel + '';
      }

      if (this.exportAddress.value) {
        exportPayload.address = scout.address;
      }

      if (this.exportContact.value) {
        exportPayload.phone = scout.phone;
      }

      if (this.exportRanks.value) {
        exportPayload.rank = scout.rank.name;
        exportPayload.instructorRank = scout.instructorRank.name;
      }

      if (this.exportAfiliation.value) {
        exportPayload.troop = scout.troop.name;

        let rolesString = '';
        this.scoutRoles
          .find((x) => x.scoutId === scout.scoutId)
          .roles.forEach((r) => {
            rolesString += r.name + ', ';
          });

        exportPayload.roles = rolesString;
      }

      exportPayloads.push(exportPayload);
    });

    new CSVExporter().exportAndDownlaod(
      this.filename.value + '.csv',
      exportPayloads,
      headers
    );
  }

  // UTILS

  generatedFilename(): string {
    const date = new Date();
    return (
      this.translate.instant('export-scout-csv.filename-to-export') +
      date.toLocaleDateString('en-US')
    );
  }

  toggleExportAll(value: boolean): void {
    this.form.patchValue({
      exportCredentials: value,
      exportAddress: value,
      exportContact: value,
      exportRanks: value,
      exportAfiliation: value,
    });
  }

  checkToggleAll(): void {
    if (
      this.exportCredentials.value &&
      this.exportAddress.value &&
      this.exportContact.value &&
      this.exportRanks.value &&
      this.exportAfiliation.value
    ) {
      this.exportAll.setValue(true);
    } else {
      this.exportAll.setValue(false);
    }
  }

  // FORM SETUP

  setupForm(): void {
    this.form = this.fb.group({
      filename: [this.generatedFilename(), [Validators.required]],
      exportAll: [true, [Validators.required]],
      exportCredentials: [true, [Validators.required]],
      exportAddress: [true, [Validators.required]],
      exportContact: [true, [Validators.required]],
      exportRanks: [true, [Validators.required]],
      exportAfiliation: [true, [Validators.required]],
    });
  }

  // FORMS

  get filename(): AbstractControl {
    return this.form.get('filename');
  }

  get exportAll(): AbstractControl {
    return this.form.get('exportAll');
  }

  get exportCredentials(): AbstractControl {
    return this.form.get('exportCredentials');
  }

  get exportAddress(): AbstractControl {
    return this.form.get('exportAddress');
  }

  get exportContact(): AbstractControl {
    return this.form.get('exportContact');
  }

  get exportRanks(): AbstractControl {
    return this.form.get('exportRanks');
  }

  get exportAfiliation(): AbstractControl {
    return this.form.get('exportAfiliation');
  }
}
