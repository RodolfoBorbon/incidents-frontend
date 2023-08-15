import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
import { environment } from '../../environments/environment'

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent {
  newUser = {
    username: '',
    password: '',
    email: ''
};

private baseApiUrl = environment.apiBaseUrl; // Get the base URL from the environment

constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) { 
    console.log(this.baseApiUrl); // Should print the correct API base URL based on the environment
}

registerUser(form: NgForm) {
    this.http.post(`${this.baseApiUrl}/registerUser`, this.newUser)
.subscribe({
    next: (res: any) => {
        form.resetForm(); 
        this.snackBar.open('Account created successfully', '', {
            duration: 7000,
        });
        this.router.navigate(['/login']);
    },
    error: (err) => {
        console.error(err);
        this.snackBar.open(err.error.message || 'An error occurred', '', {
            duration: 7000,
        });
    }
})}}
