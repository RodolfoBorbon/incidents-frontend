import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home/home.component';
import { BankingSurveyComponent } from './pages/surveys/banking-survey/banking-survey.component';
import { ProductgSurveyComponent } from './pages/surveys/product-survey/product-survey.component';
import { FooterComponent } from './partials/footer/footer.component';
import { NavbarComponent } from './partials/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BankingSurveyComponent,
    ProductgSurveyComponent,
    FooterComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
