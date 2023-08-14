//app/closed-incidents-dashboard/closed-incidents-dashboard.component.ts

import { Component, OnInit } from '@angular/core';
import { IncidentService } from '../services/incident.service';

@Component({
  selector: 'app-closed-incidents-dashboard',
  templateUrl: './closed-incidents-dashboard.component.html',
  styleUrls: ['./closed-incidents-dashboard.component.css']
})
export class ClosedIncidentsDashboardComponent implements OnInit {
  closedIncidentArray: any[] = [];

  constructor(private incidentService: IncidentService) {}

  ngOnInit() {
    this.incidentService.closedIncidents$.subscribe(closedIncidents => {
      this.closedIncidentArray = closedIncidents;
    });
    this.incidentService.fetchClosedIncidents();
  }
}
