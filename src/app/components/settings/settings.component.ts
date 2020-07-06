import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '../../services/settings.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Settings } from '../../models/Settings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  settings: Settings;

  // Inject dependencies
  constructor(
    private settingsService: SettingsService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) {}

  ngOnInit() {
    // Get settings from settingsService
    this.settings = this.settingsService.getSettings();
  }

  onSubmit() {
    // Call changesettings function on service - pass in settings (bound to form)
    this.settingsService.changeSettings(this.settings);
    this.flashMessage.show('Settings saved successfully', {
      cssClass: 'alert-success',
      timeout: 3000,
    });
  }
}
