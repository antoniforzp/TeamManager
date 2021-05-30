import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error/error.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { PageSpinnerComponent } from './page-spinner/page-spinner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppTranslationModule } from '../translation/app-translation.module';
import { SearchBoxComponent } from './search-box/search-box.component';
import { SearchPipe } from '../pipes/search.pipe';

@NgModule({
  providers: [SearchPipe],
  declarations: [
    ErrorComponent,
    FooterComponent,
    MenuComponent,
    PageHeaderComponent,
    PageSpinnerComponent,
    SearchBoxComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    AppTranslationModule,
  ],
  exports: [
    ErrorComponent,
    FooterComponent,
    MenuComponent,
    PageHeaderComponent,
    PageSpinnerComponent,
    SearchBoxComponent,
  ],
})
export class SharedModule {}
