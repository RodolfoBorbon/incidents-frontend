import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncidentDashboardComponent } from './incident-dashboard/incident-dashboard.component';
import { ClosedIncidentsDashboardComponent } from './closed-incidents-dashboard/closed-incidents-dashboard.component'; // Assuming you have a ClosedIncidentsDashboardComponent defined
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo:'/home', pathMatch: 'full' }, 
  { path:'home', component: HomeComponent},
  { path: 'incidents', component: IncidentDashboardComponent },
  { path: 'closed-incidents', component: ClosedIncidentsDashboardComponent },
  { path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

