import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddEditTroopModalComponent } from './add-edit-troop-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/app-material.module';
import { AppTranslationModule } from 'src/app/translation/app-translation.module';

@NgModule({
  declarations: [AddEditTroopModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    AppTranslationModule,
  ],
})
export class AddEditTeamModalModule {}
