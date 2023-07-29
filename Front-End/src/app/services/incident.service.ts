//app/services/incident.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class IncidentService {
  
  openIncidents$ = new BehaviorSubject<any[]>([]);
  closedIncidents$ = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) { }

  fetchOpenIncidents() {
    this.http.get<any>("http://localhost:4800/incidents").subscribe(resultData => {
      this.openIncidents$.next(resultData);
    });
  }

  updateIncident(id: string, bodyData: any): Observable<any> {
    const url = `http://localhost:4800/incidents/${id}`;
    return this.http.patch(url, bodyData);
  }

  deleteIncident(id: string): Observable<any> {
    const url = `http://localhost:4800/incidents/${id}`;
    return this.http.delete(url);
  }

  createIncident(bodyData: any): Observable<any> {
    const url = "http://localhost:4800/incident/create";
    return this.http.post(url, bodyData);
  }

  updateIncidentStatus(id: string, status: string, userNarrative: string): Observable<any> {
    const url = `http://localhost:4800/incidents/${id}`;
    const bodyData = { "status": status, "userNarrative": userNarrative };
    return this.http.patch(url, bodyData);
  }

  fetchClosedIncidents() {
    this.http.get<any>("http://localhost:4800/closed-incidents").subscribe(resultData => {
      this.closedIncidents$.next(resultData);
    });
  }

  closeIncident(id: string, resolution: string): Observable<any> {
    const closedDate = new Date();
    return this.http.patch(`http://localhost:4800/incidents/close/${id}`, { incidentResolution: resolution, closedDate: closedDate });
  }  
}


