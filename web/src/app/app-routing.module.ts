import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MeetingsComponent } from './pages/meetings/meetings.component';
import { ScoutsComponent } from './pages/scouts/scouts.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { TroopsComponent } from './pages/troops/troops.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'addUser', component: AddUserComponent },
  { path: 'editUser', component: EditUserComponent },
  { path: 'home', component: HomeComponent },
  { path: 'teams', component: TeamsComponent },
  { path: 'scouts', component: ScoutsComponent },
  { path: 'troops', component: TroopsComponent },
  { path: 'meetings', component: MeetingsComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
