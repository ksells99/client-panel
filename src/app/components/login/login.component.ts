import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  userMessage: string;

  // Inject authservice & flashMessages as dependency
  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) {}

  // Check if user is logged in - redirect if so
  ngOnInit() {
    this.authService.getAuth().subscribe((auth) => {
      // If logged in...
      if (auth) {
        // Redirect to dashboard
        this.router.navigate(['/']);
      }
    });
  }

  onSubmit() {
    // Call login function on authService injected above - pass in email/pw properties from above (ngModel from form)
    this.authService
      .login(this.email, this.password)
      //Login returns a promise so use .then (if successful)
      .then((res) => {
        // Show flash message
        this.flashMessage.show('Logged in successfully', {
          cssClass: 'alert-success',
          timeout: 3000,
        });

        // Redirect to dashboard once logged in
        this.router.navigate(['/']);
      })
      // Else if rejected/error
      .catch((err) => {
        // Create custom message instead of firebase auth error message
        if (err.message) {
          this.userMessage = 'Invalid credentials. Please try again';
        }

        // Show flash message - pass in custom error as message
        this.flashMessage.show(this.userMessage, {
          cssClass: 'alert-danger',
          timeout: 3000,
        });
      });
  }
}
