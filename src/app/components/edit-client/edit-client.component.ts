import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { SettingsService } from '../../services/settings.service';
import { FlashMessagesService } from 'angular2-flash-messages';

import { Client } from '../../models/Client';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css'],
})
export class EditClientComponent implements OnInit {
  id: string;
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0,
  };

  disableBalanceOnEdit: boolean;

  // Inject services as dependencies
  constructor(
    private clientService: ClientService,
    private settingsService: SettingsService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) {}

  ngOnInit() {
    // Set balance disabled or not based on settings
    this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit;

    // Get client ID from URL
    this.id = this.route.snapshot.params['id'];

    // Get client, pass in ID - call from clientService injected above - subscribe to it to get client back
    this.clientService.getClient(this.id).subscribe(
      (client) =>
        // Set client property to the client obtained from firebase
        (this.client = client)
    );
  }

  // Value = form data based on Client model-
  onSubmit({ value, valid }: { value: Client; valid: boolean }) {
    // Check valid - throw error if not
    if (!valid) {
      // If form not valid, show error flash msg - hide after 3sec.
      this.flashMessage.show('Please enter valid details', {
        cssClass: 'alert-danger',
        timeout: 3000,
      });

      // If it is valid, update client
    } else {
      // Add ID to client (defined above - based on URL)
      value.id = this.id;

      // Call updateClient from service - pass in form data (value)
      this.clientService.updateClient(value);

      // Show success flash msg - hide after 3sec.
      this.flashMessage.show('Client saved successfully', {
        cssClass: 'alert-success',
        timeout: 3000,
      });

      // Redirect to client page
      this.router.navigate(['/client/' + this.id]);
    }
  }
}
