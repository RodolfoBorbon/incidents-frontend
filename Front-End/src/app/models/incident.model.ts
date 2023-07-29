//app/model/incident.model.ts

export interface Incident {
  _id?: string;
  incidentRecordNumber: string;
  incidentDescription: string;
  incidentPriority: string;
  customerName: string;
  customerPhoneNumber: string;
  customerAddress: string;
  incidentNarrative: string;
  incidentResolution?: string;  // Add this line
  incidentStatus?: string;
  status?: string; // If the 'status' property is different from 'incidentStatus'
  closedDate?: Date;
}

  
  