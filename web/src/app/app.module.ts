import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { PagesModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './material/app-material.module';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { AppTranslationModule } from './translation/app-translation.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SearchPipe } from './pipes/search.pipe';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,

    // Routing
    RouterModule,
    AppRoutingModule,

    // Forms
    FormsModule,
    ReactiveFormsModule,

    // Mat modules
    MaterialModule,
    MatDialogModule,
    BrowserAnimationsModule,

    // Ng Select
    NgSelectModule,

    // App modules
    PagesModule,
    SharedModule,

    // Translation
    AppTranslationModule,

    // Charts
    NgApexchartsModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
