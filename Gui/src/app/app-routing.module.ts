import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {PagesUrls} from './utils/PagesUrls';
import {LoginPageComponent} from './components/pages/login-page/login-page.component';
import {AddUserPageComponent} from './components/pages/add-user-page/add-user-page.component';
import {HomePageComponent} from './components/pages/home-page/home-page.component';
import {EditUserPageComponent} from './components/pages/edit-user-page/edit-user-page.component';
import {ScoutsRecordsPageComponent} from './components/pages/scouts-records-page/scouts-records-page.component';

const routes: Routes = [
  {path: PagesUrls.LOGIN, component: LoginPageComponent},
  {path: PagesUrls.ADD_USER, component: AddUserPageComponent},
  {path: PagesUrls.HOME, component: HomePageComponent},
  {path: PagesUrls.EDIT_USER, component: EditUserPageComponent},
  {path: PagesUrls.SCOUTS_RECORDS, component: ScoutsRecordsPageComponent}
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
