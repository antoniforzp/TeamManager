import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoutModalComponent } from './logout-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/app-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppTranslationModule } from 'src/app/translation/app-translation.module';

@NgModule({
  declarations: [LogoutModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    AppTranslationModule
  ],
})
export class LogoutModalModule {}
