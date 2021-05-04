import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Routes } from 'src/app/shared/menu/Routes';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  currentRoute = new BehaviorSubject<Routes>(null);

  constructor(private router: Router) {
    this.router.events.subscribe((x) => {
      console.log(x);
    });
  }

  // GETTERS

  public getLoginRoute(): string {
    return `/${Routes.LOGIN}`;
  }

  public navigateToLogin(): Promise<boolean> {
    return this.router.navigate([this.getLoginRoute()]);
  }

  public getHomeRoute(): string {
    return `/${Routes.HOME}`;
  }

  public navigateToHome(): Promise<boolean> {
    return this.router.navigate([this.getHomeRoute()]);
  }

  public getScoutsRoute(): string {
    return `/${Routes.SCOUTS}`;
  }

  public navigateToScouts(): Promise<boolean> {
    return this.router.navigate([this.getScoutsRoute()]);
  }

  public getTroopsRoute(): string {
    return `/${Routes.TROOPS}`;
  }

  public navigateToTroops(): Promise<boolean> {
    return this.router.navigate([this.getTroopsRoute()]);
  }

  public getMeetingsJourneysRoute(): string {
    return `/${Routes.MEETINGS_JOUNEYS}`;
  }

  public navigateToMeetingsJourneys(): Promise<boolean> {
    return this.router.navigate([this.getMeetingsJourneysRoute()]);
  }

  public getAddUserRoute(): string {
    return `/${Routes.ADD_USER}`;
  }

  public navigateToAddUser(): Promise<boolean> {
    return this.router.navigate([this.getAddUserRoute()]);
  }

  public getEditUserRoute(): string {
    return `/${Routes.EDIT_USER}`;
  }

  public navigateToEditUser(): Promise<boolean> {
    return this.router.navigate([this.getEditUserRoute()]);
  }

  public getTeamsRoute(): string {
    return `/${Routes.TEAMS}`;
  }

  public navigateTeams(): Promise<boolean> {
    return this.router.navigate([this.getTeamsRoute()]);
  }

  public getCurrentRoute(): BehaviorSubject<Routes> {
    return this.currentRoute;
  }

  public navigateTo(route: Routes): Promise<boolean> {
    this.currentRoute.next(route);
    return this.router.navigate([route]);
  }
}
