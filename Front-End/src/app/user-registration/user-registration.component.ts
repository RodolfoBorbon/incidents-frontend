import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';

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

constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) { }

registerUser(form: NgForm) {
    this.http.post('http://localhost:4800/registerUser', this.newUser)
.subscribe({
    next: (res: any) => {
        form.resetForm(); //reset the form
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
