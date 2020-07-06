import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SettingsService } from '../../services/settings.service';
import { FlashMessagesService } from 'angular2-flash-messages';

import { Client } from '../../models/Client';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean;
  loggedInUser: string;
  showRegister: boolean;

  // Inject dependencies
  constructor(
    private authService: AuthService,
    private settingsService: SettingsService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) {}

  ngOnInit() {
    // Subscribe to auth status
    this.authService.getAuth().subscribe((auth) => {
      // If logged in...
      if (auth) {
        // Set logged in to true, get user's email address
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;

        // Else if not logged in
      } else {
        this.isLoggedIn = false;
      }
    });

    // Get showRegister status from settings service - will determine if reg link is shown on navbar
    this.showRegister = this.settingsService.getSettings().allowRegistration;
  }

  onLogoutClick() {
    // Call logout function in authService injected above
    this.authService.logout();
    this.flashMessage.show('You have now logged out', {
      cssClass: 'alert-success',
      timeout: 3000,
    });
    this.router.navigate(['/login']);
  }
}
