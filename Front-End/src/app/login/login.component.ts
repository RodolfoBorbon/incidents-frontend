//app/login/login.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service/auth-service.component';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = {
    username: '',
    password: ''
};

errorMessage = '';

constructor(
  private authService: AuthService,
  private router: Router,
  private snackBar: MatSnackBar // Inject MatSnackBar
) { }

loginUser() {
  this.authService.login(this.user.username, this.user.password)
      .subscribe({
          next: (res: any) => {
              if (res.status === 200) {
                  console.log(res.message);
              } else {
                  console.error(res.message);

                  // Show a message on login page using MatSnackBar
                  this.snackBar.open('Invalid username or password, try again', 'Close', {
                    duration: 5000, // Display duration (in milliseconds)
                    panelClass: 'error-snackbar' // Optional CSS class for styling the snackbar
                  });
              }
          },
          error: (err) => {
              console.error(err);
          }
      });
}
}

