import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/app-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ShowScoutsModalComponent } from './show-scouts-modal.component';

@NgModule({
  declarations: [ShowScoutsModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
  ],
})
export class ShowScoutsModalModule {}