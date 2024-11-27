import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  showLogoutButton: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      const currentRoute = this.router.url;
      this.showLogoutButton = !(currentRoute.includes('login') || currentRoute.includes('register'));
    });
  }

  logout() {
    console.log('User logged out');
    this.router.navigate(['/login']);
  }
}