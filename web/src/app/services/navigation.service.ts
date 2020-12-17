import {Injectable} from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router) {
  }

  private navigateTo(url: string) {
    this.router.navigateByUrl(url)
      .then(value => console.log('Navigated to: ' + value));
  }

  /**
   * Global navigation methods available throughout the application
   * They are divided into two kinds:
   * - parameterless navigating to static pages
   * - with parameter(s) navigating to dynamic data pages (e.g. selected to edit/update)
   */

  /**
   * Parameterless (to static)
   */

  public goToLoginPage() {
    this.navigateTo('/');
  }

  public goToAddUser() {
    this.navigateTo('/add-user');
  }

  public goToHomePage() {
    this.navigateTo('/home');
  }

  public goToEditUser() {
    this.navigateTo('/user');
  }

  public goToRecords() {
    this.navigateTo('/records');
  }
}
