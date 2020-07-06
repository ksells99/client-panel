import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Inject angularfire auth dependency
  constructor(private afAuth: AngularFireAuth) {}

  // Login user
  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      // Call sign in method via AngularFireAuth injected above, email/pw passed in - user data then returned so pass this into promise
      this.afAuth.auth.signInWithEmailAndPassword(email, password).then(
        (userData) => resolve(userData),
        // Reject if error
        (err) => reject(err)
      );
    });
  }

  // Register
  register(email: string, password: string) {
    return new Promise((resolve, reject) => {
      // Call createUser method via AngularFireAuth injected above, email/pw passed in - user data then returned so pass this into promise
      this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(
        (userData) => {
          resolve(userData);
        },
        // Reject if error
        (err) => reject(err)
      );
    });
  }

  // Get auth status
  getAuth() {
    return this.afAuth.authState.pipe(map((auth) => auth));
  }

  // Logout user
  logout() {
    this.afAuth.auth.signOut();
  }
}
