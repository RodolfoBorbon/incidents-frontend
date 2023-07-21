import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-incident-dashboard',
  templateUrl: './incident-dashboard.component.html',
  styleUrls: ['./incident-dashboard.component.css']
})
export class IncidentDashboardComponent {
  incidentDescription: string ="";
  incidentPriority: string ="";
  customerName: string ="";
  customerPhoneNumber: string ="";
  customerAddress: string ="";
  incidentNarrative: string ="";


constructor(private http: HttpClient){ }

//funtion being called when the user click the button: createIncidentTicket
createIncidentTicket()
{
  var bodyData = {
  "incidentDescription": this.incidentDescription,
  "incidentPriority": this.incidentPriority,
  "customerName": this.customerName,
  "customerPhoneNumber": this.customerPhoneNumber,
  "customerAddress": this.customerAddress,
  "incidentNarrative": this.incidentNarrative 
};

this.http.post("http://localhost:8000/user/create",bodyData).subscribe((resultData: any) =>
{
  console.log(resultData);
  alert("Incident registered successfully")
  this.incidentDescription = '';
  this.incidentPriority = '';
  this.customerName = '';
  this.customerPhoneNumber = '';
  this.customerAddress = '';
  this.incidentNarrative = '';
  });
 }
}