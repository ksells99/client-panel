import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from 'angularfire2/firestore';
import { Observable, of } from 'rxjs';
import { Client } from '../models/Client';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  clientsCollection: AngularFirestoreCollection<Client>;
  clientDoc: AngularFirestoreDocument<Client>;
  clients: Observable<Client[]>;
  client: Observable<Client>;

  // Inject firestore as dependency
  constructor(private afs: AngularFirestore) {
    this.clientsCollection = this.afs.collection('clients', (ref) =>
      ref.orderBy('lastName', 'asc')
    );
  }

  // Get all clients
  getClients(): Observable<Client[]> {
    // Get clients with IDs
    this.clients = this.clientsCollection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((action) => {
          const data = action.payload.doc.data() as Client;
          data.id = action.payload.doc.id;
          return data;
        });
      })
    );

    return this.clients;
  }

  // Add client
  newClient(client: Client) {
    // Add to client collection on firebase - pass in client from form
    this.clientsCollection.add(client);
  }

  // Get specific client - pass in ID
  getClient(id: string): Observable<Client> {
    // Get client from firebase doc
    this.clientDoc = this.afs.doc<Client>(`clients/${id}`);

    // Get the client data inc. ID
    this.client = this.clientDoc.snapshotChanges().pipe(
      map((action) => {
        // If no client found, return nothing
        if (action.payload.exists === false) {
          return null;

          // Else get the client data
        } else {
          const data = action.payload.data() as Client;
          data.id = action.payload.id;
          return data;
        }
      })
    );
    return this.client;
  }

  // Update client
  updateClient(client: Client) {
    // Find the relevant client doc
    this.clientDoc = this.afs.doc(`clients/${client.id}`);
    // Update this doc and pass in new client details
    this.clientDoc.update(client);
  }

  // Delete client
  deleteClient(client: Client) {
    // Find the relevant client doc
    this.clientDoc = this.afs.doc(`clients/${client.id}`);
    // Delete the client
    this.clientDoc.delete();
  }
}
