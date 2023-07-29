//app/incident-dasboard/incident-dashboard.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'; // Import the ToastrService
import { IncidentService } from '../services/incident.service';
import { Incident } from '../models/incident.model'; // Import the Incident interface
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-incident-dashboard',
  templateUrl: './incident-dashboard.component.html',
  styleUrls: ['./incident-dashboard.component.css']
})
export class IncidentDashboardComponent {
  IncidentArray: Incident[] = [];

  currentIncidentID = "";
  incidentRecordNumber = "";   
  incidentDescription: string = "";
  incidentPriority: string = "";
  customerName: string = "";
  customerPhoneNumber: string = "";
  customerAddress: string = "";
  incidentNarrative: string = "";
  incidentStatus: string = "";
  incidentResolution: string = "";
  userNarrative: string = "";

  isNarrativeEditable = false;

  constructor(private incidentService: IncidentService, private router: Router, private toastr: ToastrService, private datePipe: DatePipe) { 
    this.incidentService.openIncidents$.subscribe(openIncidents => {
      this.IncidentArray = openIncidents;
    });
    this.incidentService.fetchOpenIncidents();
  }
  formatDate(date: Date) {
    return this.datePipe.transform(date, 'short');
  }
  

  resetForm() {
    this.currentIncidentID = "";
    this.incidentRecordNumber = "";    
    this.incidentDescription = "";
    this.incidentPriority = "";
    this.customerName = "";
    this.customerPhoneNumber = "";
    this.customerAddress = "";
    this.incidentNarrative = "";
    this.incidentStatus = "";
    this.isNarrativeEditable = false;
    this.userNarrative = "";
  }

  // Update your closeIncident method to use the service
// Method to handle closing an incident
confirmAndCloseIncident(incident: Incident) {
  const shouldClose = window.confirm("Are you sure you want to close this incident?");
  if (shouldClose) {
    const resolution = window.prompt("Please enter the resolution of this incident:");
    if (resolution) {
      if (incident._id) {
        this.incidentService.closeIncident(incident._id, resolution).subscribe((resultData: any) => {
          console.log(resultData);
          // Remove the incident from the list of open incidents
          this.IncidentArray = this.IncidentArray.filter(incidentItem => incidentItem._id !== incident._id);
          this.toastr.success(`Incident status changed to CLOSED Successfully!`);
          // No need to fetch all incidents again if we manually remove the closed one from our list.
          // this.incidentService.fetchOpenIncidents();
        });
      } else {
        console.error('Incident id is undefined');
      }
    } else {
      this.toastr.error("Cannot close incident without a resolution.");
    }
  }
}

  // Add the onStatusChange method
   // Add the onStatusChange method
   onStatusChange(incidentItem: Incident) {
    if (incidentItem.status === 'IN_PROGRESS' || incidentItem.status === 'DISPATCHED') {
      this.fillForm(incidentItem);
      // add new narrative with timestamp
      let timestamp = new Date();
      let formattedTimestamp = this.formatDate(timestamp);
      this.userNarrative += `\nUpdated at ${formattedTimestamp}:  `; // update userNarrative instead of incidentNarrative
      this.isNarrativeEditable = true;
    } else if (incidentItem.status === 'CLOSED') {
      this.confirmAndCloseIncident(incidentItem); 
    }
  }
  


  // Add the fillForm method
  fillForm(incidentItem: Incident) {
    this.currentIncidentID = incidentItem._id ? incidentItem._id : "";
    this.incidentRecordNumber = incidentItem.incidentRecordNumber;
    this.incidentDescription = incidentItem.incidentDescription;
    this.incidentPriority = incidentItem.incidentPriority;
    this.customerName = incidentItem.customerName;
    this.customerPhoneNumber = incidentItem.customerPhoneNumber;
    this.customerAddress = incidentItem.customerAddress;
    this.incidentNarrative = incidentItem.incidentNarrative;
    this.isNarrativeEditable = true;
  }

  save() {
    if (this.isNarrativeEditable) {
      this.updateIncidentNarrative();
    } else {
      this.register();
    }
  }

  updateIncidentNarrative() {
    this.incidentService.updateIncident(this.currentIncidentID, {
      status: this.incidentStatus,
      userNarrative: this.userNarrative // use userNarrative here
    }).subscribe((resultData: any) => {
      console.log(resultData);
      this.toastr.success(`Incident Narrative updated Successfully!`);
      this.resetForm();
      this.incidentService.fetchOpenIncidents();
    });
  }

  setDelete(data: any) {
    this.incidentService.deleteIncident(data._id).subscribe((resultData: any) => {
      console.log(resultData);
      this.toastr.success("Incident Deleted Successfully!");
      this.incidentService.fetchOpenIncidents();
    });
  }

  
  register() {
    let timestamp = new Date();
    
    let options: Intl.DateTimeFormatOptions = { 
      year: '2-digit', 
      month: 'numeric', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit'
    };
    
    let formattedTimestamp = this.formatDate(timestamp);
  
    this.userNarrative = `Created at ${formattedTimestamp}:  ` + this.userNarrative + '\n'; // Combine narratives here

    this.incidentStatus = 'NEW';
    this.incidentRecordNumber = `INC-${Date.now()}`; // Generate your unique number here
  
    var bodyData: Incident = {
      "incidentRecordNumber": this.incidentRecordNumber,
      "incidentDescription": this.incidentDescription,
      "incidentPriority": this.incidentPriority,
      "customerName": this.customerName,
      "customerPhoneNumber": this.customerPhoneNumber,
      "customerAddress": this.customerAddress,
      "incidentNarrative": this.userNarrative,  // Changed to use userNarrative here
      "incidentStatus": this.incidentStatus
    };
    
    this.incidentService.createIncident(bodyData).subscribe({
      next: (resultData: any) => {
        this.toastr.success("Incident Registered Successfully!");
        this.resetForm();
        this.incidentService.fetchOpenIncidents();
      },
      error: error => {
        this.toastr.error('There was an error!', error);
      }
    });
  }

  
  

// d. Method to update status of an incident
updateStatus(incident: any, newStatus: string) {
  if (incident.status === 'CLOSED') {
    alert('This incident is already CLOSED and cannot be modified');
    return;
  }
  this.incidentStatus = newStatus;
}

// Method to change status of an incident
updateIncidentStatus(incident: Incident, event: Event) {
  const newStatus = (event.target as HTMLSelectElement).value;
  if (newStatus === 'CLOSED') {
    this.confirmAndCloseIncident(incident);
  } else {
    if(incident._id) {
      // Use updateIncident instead of updateIncidentStatus
      this.incidentService.updateIncident(incident._id, {
        status: newStatus, 
        userNarrative: this.userNarrative
      }).subscribe((resultData: any) => {
        console.log(resultData);
        this.toastr.success(`Incident status changed to ${newStatus} Successfully!`);
        this.incidentService.fetchOpenIncidents();
      });
    } else {
      this.toastr.error("Incident ID is not available.");
    }
  }
}

}



