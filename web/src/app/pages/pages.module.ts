import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ScoutsComponent } from './scouts/scouts.component';
import { TeamsComponent } from './teams/teams.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { TroopsComponent } from './troops/troops.component';
import { MeetingsComponent } from './meetings/meetings.component';

@NgModule({
  declarations: [
    AddUserComponent,
    EditUserComponent,
    HomeComponent,
    LoginComponent,
    ScoutsComponent,
    TeamsComponent,
    TroopsComponent,
    MeetingsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class PagesModule {}
