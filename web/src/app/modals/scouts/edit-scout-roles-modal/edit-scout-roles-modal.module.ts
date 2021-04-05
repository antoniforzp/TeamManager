import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/app-material.module';
import { EditScoutRolesModalComponent } from './edit-scout-roles-modal.component';

@NgModule({
  declarations: [EditScoutRolesModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
  ],
})
export class ScoutRolesModalModule {}
