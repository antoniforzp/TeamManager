import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import {
  NgbPaginationModule,
  NgbAlertModule,
  NgbModule,
} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { ProgressModalComponent } from './global/progress-modal/progress-modal.component';
import { SuccessModalComponent } from './global/success-modal/success-modal.component';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './global/menu/menu.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { TeamsComponent } from './pages/teams/teams.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddUserComponent,
    ProgressModalComponent,
    SuccessModalComponent,
    HomeComponent,
    MenuComponent,
    EditUserComponent,
    TeamsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgbAlertModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
