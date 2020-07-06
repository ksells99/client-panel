import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/Client';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent implements OnInit {
  clients: Client[];
  totalOwed: number;

  // Inject clientservice as dependency
  constructor(private clientService: ClientService) {}

  ngOnInit() {
    // Run getClients on clientservice injected above - returns observable so need to subscribe to it - returns clients array
    this.clientService.getClients().subscribe((clients) => {
      // Set clients array to data
      this.clients = clients;
      // Call getTotalOwed function below
      this.getTotalOwed();
    });
  }

  getTotalOwed() {
    // Map through clients array - for each client, get balance and add to total (initial total = 0) - then set to totalOwed property
    this.totalOwed = this.clients.reduce((total, client) => {
      return total + parseFloat(client.balance.toString());
    }, 0);
  }
}
