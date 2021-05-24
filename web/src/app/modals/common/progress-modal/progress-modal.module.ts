import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProgressModalComponent } from './progress-modal.component';
import { MaterialModule } from 'src/app/material/app-material.module';
import { AppTranslationModule } from 'src/app/translation/app-translation.module';

@NgModule({
  declarations: [ProgressModalComponent],
  imports: [CommonModule, MaterialModule, SharedModule, AppTranslationModule],
})
export class ProgressModalModule {}
