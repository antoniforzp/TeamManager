import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/app-material.module';
import { EditScoutRolesModalComponent } from './edit-scout-roles-modal.component';
import { AppTranslationModule } from 'src/app/translation/app-translation.module';

@NgModule({
  declarations: [EditScoutRolesModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    AppTranslationModule
  ],
})
export class ScoutRolesModalModule {}
