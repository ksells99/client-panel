import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;

  // Inject authservice & flashMessages as dependency
  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) {}

  ngOnInit() {}

  onSubmit() {
    // Call register function from authService injected above - pass in email/pw (modelled from form inputs)
    this.authService
      .register(this.email, this.password)
      // Returns a promise so use .then - if successful
      .then((res) => {
        // Show success message
        this.flashMessage.show(
          'Registration successful. You are now logged into ClientPanel',
          { cssClass: 'alert-success', timeout: 3000 }
        );
        // Redirect to dashboard as will automatically be logged in
        this.router.navigate(['/']);
      })

      .catch((err) => {
        this.flashMessage.show(err.message, {
          cssClass: 'alert-danger',
          timeout: 3000,
        });
      });
  }
}
