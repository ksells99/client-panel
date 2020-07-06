import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from '../../services/client.service';
import { SettingsService } from '../../services/settings.service';

import { Client } from '../../models/Client';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css'],
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0,
  };

  disableBalanceOnAdd: boolean;

  // Grab form data from HTML
  @ViewChild('clientForm') form: any;

  // Inject flashmessages service & clientservice/settingsservice as dependency - also router to redirect
  constructor(
    private flashMessage: FlashMessagesService,
    private clientService: ClientService,
    private settingsService: SettingsService,
    private router: Router
  ) {}

  ngOnInit() {
    // Get disableBalance status from getSettings function within settingsService
    this.disableBalanceOnAdd = this.settingsService.getSettings().disableBalanceOnAdd;
  }

  // Value = form fields - type of Client model
  onSubmit({ value, valid }: { value: Client; valid: boolean }) {
    // If disableBalanceOnAdd=true, balance won't be included in form data - need to assign here instead
    if (this.disableBalanceOnAdd) {
      value.balance = 0;
    }

    if (!valid) {
      // If form not valid, show error flash msg - hide after 3sec.
      this.flashMessage.show('Please enter valid details', {
        cssClass: 'alert-danger',
        timeout: 3000,
      });
    } else {
      // Add new client - call newClient in service injected above, pass in form data
      this.clientService.newClient(value);

      // Show success flash msg - hide after 3sec.
      this.flashMessage.show('Client added successfully', {
        cssClass: 'alert-success',
        timeout: 3000,
      });

      // Redirect to dashboard - use navigate from router service injected above
      this.router.navigate(['/']);
    }
  }
}
