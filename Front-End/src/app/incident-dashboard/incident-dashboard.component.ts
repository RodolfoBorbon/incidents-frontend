import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; // Import the Router module

@Component({
  selector: 'app-incident-dashboard',
  templateUrl: './incident-dashboard.component.html',
  styleUrls: ['./incident-dashboard.component.css']
})
export class IncidentDashboardComponent {
  IncidentArray: any[] = [];

  currentIncidentID = "";
  incidentDescription: string = "";
  incidentPriority: string = "";
  customerName: string = "";
  customerPhoneNumber: string = "";
  customerAddress: string = "";
  incidentNarrative: string = "";

  constructor(private http: HttpClient, private router: Router) {
    this.getAllIncident();
  }

  getAllIncident() {
    this.http.get("http://localhost:4800/incidents").subscribe((resultData: any) => {
      console.log(resultData);
      this.IncidentArray = resultData;
    });
  }

  setUpdate(data: any) {
    this.incidentDescription = data.incidentDescription;
    this.incidentPriority = data.incidentPriority;
    this.customerName = data.customerName;
    this.customerPhoneNumber = data.customerPhoneNumber;
    this.customerAddress = data.customerAddress;
    this.incidentNarrative = data.incidentNarrative;
    this.currentIncidentID = data._id;
  }

  // Function being called when the user clicks the button: createIncidentTicket
  UpdateRecords() {
    let bodyData = {
      "incidentDescription": this.incidentDescription,
      "incidentPriority": this.incidentPriority,
      "customerName": this.customerName,
      "customerPhoneNumber": this.customerPhoneNumber,
      "customerAddress": this.customerAddress,
      "incidentNarrative": this.incidentNarrative
    };

    this.http.patch("http://localhost:4800/incidents" + "/" + this.currentIncidentID, bodyData).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Incident Updated Successfully!");
      this.getAllIncident();
    });
  }

  setDelete(data: any) {
    this.http.delete("http://localhost:4800/incidents" + "/" + data._id).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Incident Deleted Successfully!");
      this.getAllIncident();
    });
  }

  save() {
    if (this.currentIncidentID == '') {
      this.register();
    } else {
      this.UpdateRecords();
    }
  }

  register() {
    var bodyData = {
      "incidentDescription": this.incidentDescription,
      "incidentPriority": this.incidentPriority,
      "customerName": this.customerName,
      "customerPhoneNumber": this.customerPhoneNumber,
      "customerAddress": this.customerAddress,
      "incidentNarrative": this.incidentNarrative
    };

    this.http.post("http://localhost:4800/incident/create", bodyData).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Incident Registered Successfully!");
      this.incidentDescription = '';
      this.incidentPriority = '';
      this.customerName = '';
      this.customerPhoneNumber = '';
      this.customerAddress = '';
      this.incidentNarrative = '';
      this.getAllIncident();
    });
  }

  // Method to handle closing an incident
  confirmCloseIncident(incident: any) {
    const shouldClose = window.confirm("Are you sure you want to close this incident?");
    if (shouldClose) {
      this.closeIncident(incident);
    }
  }

  // Method to send request to close an incident
  closeIncident(incident: any) {
    const shouldClose = window.confirm("Are you sure you want to close this incident?");
    if (shouldClose) {
      const url = `http://localhost:4800/incidents/close/${incident._id}`;
      this.http.patch(url, {}).subscribe((resultData: any) => {
        console.log(resultData);
        alert("Incident Closed Successfully!");
        // Remove the closed incident from the IncidentArray
        this.IncidentArray = this.IncidentArray.filter(item => item._id !== incident._id);
      });
  }
}

  // Method to open the Closed Incidents Dashboard
  openClosedIncidentsDashboard() {
    this.router.navigate(["/closed-incidents"]);
  }
}


