import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './global/menu/menu.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { ScoutsComponent } from './pages/scouts/scouts.component';
import { ManageScoutModalComponent } from './modals/manage-scout-modal/manage-scout-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import {
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { FailureModalComponent } from './modals/common/failure-modal/failure-modal.component';
import { SuccessModalComponent } from './modals/common/success-modal/success-modal.component';
import { MaterialModule } from './material/app-material.module';
import { ProgressModalComponent } from './modals/common/progress-modal/progress-modal.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddUserComponent,
    HomeComponent,
    MenuComponent,
    EditUserComponent,
    TeamsComponent,
    ScoutsComponent,
    ManageScoutModalComponent,
    SuccessModalComponent,
    FailureModalComponent,
    ProgressModalComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MaterialModule
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'fill' },
    },
    {
      provide: MAT_DIALOG_DATA,
      useValue: {},
    },
    {
      provide: MatDialogRef,
      useValue: {},
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
