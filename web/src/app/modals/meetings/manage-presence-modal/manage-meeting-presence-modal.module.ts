import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/app-material.module';
import { ManageMeetingPresenceComponent } from './manage-meeting-presence-modal.component';
import { AppTranslationModule } from 'src/app/translation/app-translation.module';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [ManageMeetingPresenceComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    AppTranslationModule,
    MatSortModule,
  ],
})
export class ManageMeetingPresenceModalModule {}
