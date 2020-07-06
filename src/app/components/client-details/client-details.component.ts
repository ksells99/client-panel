import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { FlashMessagesService } from 'angular2-flash-messages';

import { Client } from '../../models/Client';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css'],
})
export class ClientDetailsComponent implements OnInit {
  id: string;
  client: Client;
  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;

  // Inject services as dependencies
  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) {}

  ngOnInit() {
    // Get client ID from URL
    this.id = this.route.snapshot.params['id'];

    // Get client, pass in ID - call from clientService injected above - subscribe to it to get client back
    this.clientService.getClient(this.id).subscribe((client) => {
      // If there is a client returned & balance > 0 ,set hasBalance to true
      if (client !== null) {
        if (client.balance > 0) {
          this.hasBalance = true;
        }
      }

      // Set client property to the client obtained from firebase
      this.client = client;
    });
  }

  // Update balance
  updateBalance() {
    // Call updateClient fucntion in service, pass in updated client
    this.clientService.updateClient(this.client);

    // Show success message
    this.flashMessage.show('Balance updated', {
      cssClass: 'alert-success',
      timeout: 4000,
    });
  }

  // Delete client
  onDeleteClick() {
    if (
      confirm(
        `Are you sure you wish to delete ${this.client.firstName} ${this.client.lastName}? This is irreversible!`
      )
    ) {
      // Call deleteClient in servce - pass in client
      this.clientService.deleteClient(this.client);

      // Show success message
      this.flashMessage.show('Client deleted successfully', {
        cssClass: 'alert-success',
        timeout: 4000,
      });

      // Redirect back to dashboard
      this.router.navigate(['/']);
    }
  }
}
