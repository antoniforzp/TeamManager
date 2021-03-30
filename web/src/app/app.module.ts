import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import {
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { MaterialModule } from './material/app-material.module';
import { PagesModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';
import { EditTeamModalComponent } from './modals/teams/edit-team-modal/edit-team-modal.component';
@NgModule({
  declarations: [AppComponent, EditTeamModalComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,

    // Forms
    FormsModule,
    ReactiveFormsModule,

    // Mat modules
    MaterialModule,
    MatDialogModule,
    BrowserAnimationsModule,

    // App modules
    PagesModule,
    SharedModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
