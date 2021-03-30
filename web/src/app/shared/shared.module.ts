import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error/error.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { PageSpinnerComponent } from './page-spinner/page-spinner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ErrorComponent,
    FooterComponent,
    MenuComponent,
    PageHeaderComponent,
    PageSpinnerComponent,
  ],
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
  exports: [
    ErrorComponent,
    FooterComponent,
    MenuComponent,
    PageHeaderComponent,
    PageSpinnerComponent,
  ],
})
export class SharedModule {}
