import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IncidentDashboardComponent } from './incident-dashboard/incident-dashboard.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ClosedIncidentsDashboardComponent } from './closed-incidents-dashboard/closed-incidents-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    IncidentDashboardComponent,
    ClosedIncidentsDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
