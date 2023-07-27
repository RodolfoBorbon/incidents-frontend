// app/auth-service/auth-service.component.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Import HttpHeaders
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs'; // new import


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser') as string) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>('http://localhost:4800/login', { username, password })
        .pipe(map(user => {
            // login successful if there's a user in the response
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);

                console.log(user);  // This line logs the user details to the console
                
                // navigate to the incidents dashboard
                this.router.navigate(['/incidents']);
            }
            return user;
          }),
          catchError(err => {
              console.error(err);
              return throwError('Login failed');
          })
      );
        }

  getIncidents() {
    // obtain the token from currentUser
    const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    const token = currentUser && currentUser.token;
    
    // include the token in the headers
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get('http://localhost:4800/incidents', { headers });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);

    // Redirect to the home page after logout
    this.router.navigate(['/home']);
  }

  isLoggedIn() {
    return !!this.currentUserValue;
  }

  isAuthenticated(): Promise<boolean> {
    return Promise.resolve(this.currentUserValue !== null);
  }  
}
