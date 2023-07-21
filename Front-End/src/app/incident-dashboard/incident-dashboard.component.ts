import { Component } from '@angular/core';

@Component({
  selector: 'app-incident-dashboard',
  templateUrl: './incident-dashboard.component.html',
  styleUrls: ['./incident-dashboard.component.css']
})
export class IncidentDashboardComponent {
  incidentDescription: string ="";
  customerName: string ="";
  customerPhoneNumber: string ="";
  customerAddress: string ="";
  incidentNarrative: string ="";
}
