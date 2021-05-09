import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AppRoutes } from 'src/app/shared/menu/Routes';

@Injectable({
  providedIn: 'root',
})
export class AppNavigationService {
  currentRoute: BehaviorSubject<AppRoutes> = new BehaviorSubject<AppRoutes>(
    this.router.url.substr(1) as AppRoutes
  );

  constructor(private router: Router) {}

  // LOGIN

  public getLoginRoute(): AppRoutes {
    return AppRoutes.LOGIN;
  }

  public getLoginRouteComposed(): string {
    return `/${AppRoutes.LOGIN}`;
  }

  public navigateToLogin(): Promise<boolean> {
    this.currentRoute.next(this.getLoginRoute());
    return this.router.navigate([this.getLoginRoute()]);
  }

  // HOME

  public getHomeRoute(): AppRoutes {
    return AppRoutes.HOME;
  }

  public getHomeRouteComposed(): string {
    return `/${AppRoutes.HOME}`;
  }

  public navigateToHome(): Promise<boolean> {
    this.currentRoute.next(this.getHomeRoute());
    return this.router.navigate([this.getHomeRouteComposed()]);
  }

  // SCOUTS

  public getScoutsRoute(): AppRoutes {
    return AppRoutes.SCOUTS;
  }

  public getScoutsRouteComposed(): string {
    return `/${AppRoutes.SCOUTS}`;
  }

  public navigateToScouts(): Promise<boolean> {
    this.currentRoute.next(this.getScoutsRoute());
    return this.router.navigate([this.getScoutsRoute()]);
  }

  // TROOPS

  public getTroopsRoute(): AppRoutes {
    return AppRoutes.TROOPS;
  }

  public getTroopsRouteComposed(): string {
    return `/${AppRoutes.TROOPS}`;
  }

  public navigateToTroops(): Promise<boolean> {
    this.currentRoute.next(this.getTroopsRoute());
    return this.router.navigate([this.getTroopsRoute()]);
  }

  // JOURNEYS MEETINGS

  public getMeetingsJourneysRoute(): AppRoutes {
    return AppRoutes.MEETINGS_JOUNEYS;
  }

  public getMeetingsJourneysRouteComposed(): string {
    return `/${AppRoutes.MEETINGS_JOUNEYS}`;
  }

  public navigateToMeetingsJourneys(): Promise<boolean> {
    this.currentRoute.next(this.getMeetingsJourneysRoute());
    return this.router.navigate([this.getMeetingsJourneysRoute()]);
  }

  // ADD USER

  public getAddUserRoute(): AppRoutes {
    return AppRoutes.ADD_USER;
  }

  public getAddUserRouteComposed(): string {
    return `/${AppRoutes.ADD_USER}`;
  }

  public navigateToAddUser(): Promise<boolean> {
    this.currentRoute.next(this.getAddUserRoute());
    return this.router.navigate([this.getAddUserRoute()]);
  }

  // EDIT USER

  public getEditUserRoute(): AppRoutes {
    return AppRoutes.EDIT_USER;
  }

  public getEditUserRouteComposed(): string {
    return `/${AppRoutes.EDIT_USER}`;
  }

  public navigateToEditUser(): Promise<boolean> {
    this.currentRoute.next(this.getEditUserRoute());
    return this.router.navigate([this.getEditUserRoute()]);
  }

  // TEAMS

  public getTeamsRoute(): AppRoutes {
    return AppRoutes.TEAMS;
  }

  public getTeamsRouteComposed(): string {
    return `/${AppRoutes.TEAMS}`;
  }

  public navigateTeams(): Promise<boolean> {
    this.currentRoute.next(this.getTeamsRoute());
    return this.router.navigate([this.getTeamsRoute()]);
  }

  // UTILS

  public getCurrentRoute(): BehaviorSubject<AppRoutes> {
    return this.currentRoute;
  }

  public navigateTo(route: AppRoutes): Promise<boolean> {
    this.currentRoute.next(route);
    return this.router.navigate([route]);
  }
}
