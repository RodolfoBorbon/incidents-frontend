//app/app-routing.module.ts

import { NgModule } from '@angular/core';
import { AuthGuard } from './auth-guard/auth-guard.component';
import { RouterModule, Routes } from '@angular/router';
import { IncidentDashboardComponent } from './incident-dashboard/incident-dashboard.component';
import { ClosedIncidentsDashboardComponent } from './closed-incidents-dashboard/closed-incidents-dashboard.component'; // Assuming you have a ClosedIncidentsDashboardComponent defined
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';

const routes: Routes = [
  { path: '', redirectTo:'/home', pathMatch: 'full' }, 
  { path:'home', component: HomeComponent},
  { path: 'incidents', component: IncidentDashboardComponent, canActivate: [AuthGuard] },
  { path: 'closed-incidents', component: ClosedIncidentsDashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent},
  { path: 'user-registration', component: UserRegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

