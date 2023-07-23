import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-closed-incidents-dashboard',
  templateUrl: './closed-incidents-dashboard.component.html',
  styleUrls: ['./closed-incidents-dashboard.component.css']
})
export class ClosedIncidentsDashboardComponent implements OnInit {
  closedIncidentArray: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getAllClosedIncidents();
  }

  getAllClosedIncidents() {
    this.http.get("http://localhost:4800/closed-incidents").subscribe((resultData: any) => {
      console.log(resultData);
      this.closedIncidentArray = resultData;
    });
  }
}
