import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SettingsService } from '../services/settings.service';
import { map } from 'rxjs/operators';
import { Settings } from 'angularfire2/firestore';

@Injectable()
export class RegisterGuard implements CanActivate {
  constructor(
    private router: Router,
    private settingsService: SettingsService
  ) {}

  canActivate(): boolean {
    // Check settings service to see if registration is allowed - if so...
    if (this.settingsService.getSettings().allowRegistration) {
      return true;

      // Else if not - return false, redirect to login page
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
