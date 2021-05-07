import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/app-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SettingsModalComponent } from './settings-modal.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { AppTranslationModule } from 'src/app/translation/app-translation.module';

@NgModule({
  declarations: [SettingsModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgSelectModule,
    SharedModule,
    AppTranslationModule
  ],
})
export class SettingsModalModule {}
