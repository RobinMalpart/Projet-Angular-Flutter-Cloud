import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  showLogoutButton: boolean = true;
  isHomePage: boolean = false;

  constructor(private router: Router) {
    // Subscribe to router events
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = this.router.url;

        // Determine if the logout button should be shown
        this.showLogoutButton = !(currentRoute.includes('login') || currentRoute.includes('register'));

        // Determine if the current route is '/home'
        this.isHomePage = currentRoute === '/home';
      }
    });
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
