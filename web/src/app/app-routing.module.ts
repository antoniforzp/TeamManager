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
import { AppRoutes } from './shared/menu/Routes';

const routes: Routes = [
  { path: '', redirectTo: AppRoutes.LOGIN, pathMatch: 'full' },
  { path: AppRoutes.LOGIN, component: LoginComponent },
  { path: AppRoutes.ADD_USER, component: AddUserComponent },
  { path: AppRoutes.EDIT_USER, component: EditUserComponent },
  { path: AppRoutes.HOME, component: HomeComponent },
  { path: AppRoutes.TEAMS, component: TeamsComponent },
  { path: AppRoutes.SCOUTS, component: ScoutsComponent },
  { path: AppRoutes.TROOPS, component: TroopsComponent },
  { path: AppRoutes.MEETINGS_JOURNEYS, component: MeetingsComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
