import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/app-material.module';
import { DeleteMeetingModalComponent } from './delete-meeting-modal.component';
import { AppTranslationModule } from 'src/app/translation/app-translation.module';

@NgModule({
  declarations: [DeleteMeetingModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    AppTranslationModule,
  ],
})
export class DeleteTeamModalModule {}
