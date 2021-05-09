import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddEditScoutModalComponent } from './add-edit-scout-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/app-material.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { AppTranslationModule } from 'src/app/translation/app-translation.module';

@NgModule({
  declarations: [AddEditScoutModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    NgSelectModule,
    AppTranslationModule,
  ],
})
export class AddEditScoutModalModule {}
