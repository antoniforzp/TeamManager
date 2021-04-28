import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/app-material.module';
import { ExportCsvMeetingJourneyModalComponent } from './export-csv-meeting-journey-modal.component';

@NgModule({
  declarations: [ExportCsvMeetingJourneyModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
  ],
})
export class ExportCsvScoutModalModule {}
