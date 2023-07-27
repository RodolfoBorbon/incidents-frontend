import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service/auth-service.component'; 

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUser: any; // Variable to hold the current user's details

  constructor(private authService: AuthService) { } 

  ngOnInit(): void {
    // Subscribe to the currentUser observable from AuthService
    this.authService.currentUser.subscribe(user => this.currentUser = user);
  }
  
  logout() {
    this.authService.logout();
  }
}



