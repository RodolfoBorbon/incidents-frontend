//app/services/incident.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class IncidentService {
  
  openIncidents$ = new BehaviorSubject<any[]>([]);
  closedIncidents$ = new BehaviorSubject<any[]>([]);

  private baseApiUrl = environment.apiBaseUrl; // Get the base URL from the environment

  constructor(private http: HttpClient) { }

  fetchOpenIncidents() {
    this.http.get<any>(`${this.baseApiUrl}/incidents`).subscribe(resultData => {
      this.openIncidents$.next(resultData);
    });
  }

  updateIncident(id: string, bodyData: any): Observable<any> {
    const url = `${this.baseApiUrl}/incidents/${id}`;
    return this.http.patch(url, bodyData);
  }

  deleteIncident(id: string): Observable<any> {
    const url = `${this.baseApiUrl}/incidents/${id}`;
    return this.http.delete(url);
  }

  createIncident(bodyData: any): Observable<any> {
    const url = `${this.baseApiUrl}/incident/create`;
    return this.http.post(url, bodyData);
  }

  updateIncidentStatus(id: string, status: string, userNarrative: string): Observable<any> {
    const url = `${this.baseApiUrl}/incidents/${id}`;
    const bodyData = { "status": status, "userNarrative": userNarrative };
    return this.http.patch(url, bodyData);
  }

  fetchClosedIncidents() {
    this.http.get<any>(`${this.baseApiUrl}/closed-incidents`).subscribe(resultData => {
      this.closedIncidents$.next(resultData);
    });
  }

  closeIncident(id: string, resolution: string): Observable<any> {
    const closedDate = new Date();
    return this.http.patch(`${this.baseApiUrl}/incidents/close/${id}`, { incidentResolution: resolution, closedDate: closedDate });
  }  
}
