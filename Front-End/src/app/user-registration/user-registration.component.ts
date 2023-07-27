import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent {
  newUser = {
    name: '',
    username: '',
    password: '',
    email: ''
};

constructor(private http: HttpClient, private router: Router) { }

    registerUser() {
        this.http.post('http://localhost:4800/registerUser', this.newUser)
    .subscribe({
        next: (res: any) => {
            if (res.status === 200) {
                console.log(res.message);
                this.router.navigate(['/login']);
            } else {
                console.error(res.message);
            }
        },
        error: (err) => {
            console.error(err);
        }
    });

    }};
