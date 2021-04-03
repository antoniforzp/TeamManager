import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoutInfoModalComponent } from './scout-info-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/app-material.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ScoutInfoModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
  ],
})
export class ScoutInfoModalModule {}
