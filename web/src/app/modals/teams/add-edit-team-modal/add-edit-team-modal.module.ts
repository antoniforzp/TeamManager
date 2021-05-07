import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddEditTeamModalComponent } from './add-edit-team-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/app-material.module';
import { AppTranslationModule } from 'src/app/translation/app-translation.module';

@NgModule({
  declarations: [AddEditTeamModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    AppTranslationModule
  ],
})
export class AddEditTeamModalModule {}
