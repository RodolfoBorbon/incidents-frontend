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
   onStatusChange(incidentItem: Incident) {
    if (incidentItem.incidentStatus === 'IN_PROGRESS' || incidentItem.incidentStatus === 'DISPATCHED') {
      this.fillForm(incidentItem);
      // add new narrative with timestamp
      let timestamp = new Date();
      let formattedTimestamp = this.formatDate(timestamp);
      this.userNarrative += `\nUpdated at ${formattedTimestamp}:  `; // update userNarrative instead of incidentNarrative
      this.isNarrativeEditable = true;
    } else if (incidentItem.incidentStatus === 'CLOSED') {
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
    this.incidentStatus = 'IN_PROGRESS';  // Or any status you want to set before updating the narrative

    this.incidentService.updateIncident(this.currentIncidentID, {
        status: this.incidentStatus,
        userNarrative: this.userNarrative
    }).subscribe((resultData: any) => {
        console.log(resultData);
        window.alert(`Incident Narrative updated Successfully!`);
        
        // Find the updated incident in the IncidentArray and update its incidentStatus
        let updatedIncident = this.IncidentArray.find(incident => incident._id === this.currentIncidentID);
        if (updatedIncident) {
            updatedIncident.incidentStatus = this.incidentStatus;
        }

        this.resetForm();
    });
}

  setDelete(data: any) {
    let isConfirmed = window.confirm("Are you sure you want to delete this incident?");
    if (isConfirmed) {
        this.incidentService.deleteIncident(data._id).subscribe((resultData: any) => {
            console.log(resultData);
            this.incidentService.fetchOpenIncidents();
            alert("Incident Deleted Successfully!");
        });
    } else {
        // User clicked 'Cancel', no further action required
    }
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
      "incidentNarrative": this.userNarrative,  // Changed to use userNarrative 
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
  
  if (newStatus === 'IN_PROGRESS' || newStatus === 'DISPATCHED') {
    this.fillForm(incident);
    // prompt for userNarrative
    let userInput = window.prompt("Please provide a narrative for the status change:");
    if (userInput) {
      let timestamp = new Date();
      let formattedTimestamp = this.formatDate(timestamp);
      this.userNarrative = `\nUpdated at ${formattedTimestamp}:  ${userInput}`;
    } else {
      // If the user cancels or doesn't provide input, return without updating the status
      return;
    }
  } else if (newStatus === 'CLOSED') {
    this.confirmAndCloseIncident(incident);
    return;  // Important to return here so the rest of the code doesn't execute for CLOSED status
  }

  if(incident._id) {
    this.incidentService.updateIncident(incident._id, {
      status: newStatus, 
      userNarrative: this.userNarrative
    }).subscribe((resultData: any) => {
      console.log(resultData);
      window.alert(`Incident status changed to ${newStatus} Successfully!`);
      this.incidentService.fetchOpenIncidents();
    });
  } else {
    window.alert("Incident ID is not available.");
  }
}
}





