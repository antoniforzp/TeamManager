import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LoginPageComponent} from './components/pages/login-page/login-page.component';
import {AppRoutingModule} from './app-routing.module';
import {AddUserPageComponent} from './components/pages/add-user-page/add-user-page.component';
import {FooterComponent} from './components/elements/footer/footer.component';
import {PageHeaderComponent} from './components/global/page-header/page-header.component';
import {FormsModule} from '@angular/forms';
import {HomePageComponent} from './components/pages/home-page/home-page.component';
import {MenuComponent} from './components/elements/menu/menu.component';
import {UserInfoComponent} from './components/structures/user-info/user-info.component';
import {TeamInfoComponent} from './components/structures/team-info/team-info.component';
import {CategoryInfoComponent} from './components/structures/category-info/category-info.component';
import {EditUserPageComponent} from './components/pages/edit-user-page/edit-user-page.component';
import {UserTeamManagerComponent} from './components/structures/user-team-manager/user-team-manager.component';
import {TeamComponent} from './components/structures/user-team-manager/team/team.component';
import {ScoutsRecordsPageComponent} from './components/pages/scouts-records-page/scouts-records-page.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AddUserPageComponent,
    FooterComponent,
    FooterComponent,
    PageHeaderComponent,
    HomePageComponent,
    MenuComponent,
    UserInfoComponent,
    TeamInfoComponent,
    CategoryInfoComponent,
    EditUserPageComponent,
    UserTeamManagerComponent,
    TeamComponent,
    ScoutsRecordsPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
