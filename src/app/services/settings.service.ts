import { Injectable } from '@angular/core';

import { Settings } from '../models/Settings';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  settings: Settings = {
    allowRegistration: true,
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: true,
  };

  constructor() {
    // Check for settings saved in local storage
    if (localStorage.getItem('settings') != null) {
      // If there are settings, convert to JSON and assign to settings property
      this.settings = JSON.parse(localStorage.getItem('settings'));
    }
  }

  getSettings() {
    // Get current settings from object above - create copy of this to allow changes
    let settingsCopy: Settings = {
      allowRegistration: this.settings.allowRegistration,
      disableBalanceOnAdd: this.settings.disableBalanceOnAdd,
      disableBalanceOnEdit: this.settings.disableBalanceOnEdit,
    };
    return settingsCopy;
  }

  changeSettings(settings: Settings) {
    // Set settings properties based on form passed in
    let settingsCopy: Settings = {
      allowRegistration: settings.allowRegistration,
      disableBalanceOnAdd: settings.disableBalanceOnAdd,
      disableBalanceOnEdit: settings.disableBalanceOnEdit,
    };

    // Save to local storage - convert to string
    localStorage.setItem('settings', JSON.stringify(settingsCopy));

    // Set settings prop to new settings
    this.settings = settingsCopy;
  }
}
