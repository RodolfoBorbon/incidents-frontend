import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncidentDashboardComponent } from './incident-dashboard/incident-dashboard.component';
import { ClosedIncidentsDashboardComponent } from './closed-incidents-dashboard/closed-incidents-dashboard.component'; // Assuming you have a ClosedIncidentsDashboardComponent defined

const routes: Routes = [
  { path: '', component: IncidentDashboardComponent },
  { path: 'closed-incidents', component: ClosedIncidentsDashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

