import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BankingSurveyComponent } from './pages/surveys/banking-survey/banking-survey.component';
import { ProductSurveyComponent } from './pages/surveys/product-survey/product-survey.component';
import { FooterComponent } from './partials/footer/footer.component';
import { NavbarComponent } from './partials/navbar/navbar.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: '', component: BankingSurveyComponent},
  { path: '', component: ProductSurveyComponent},
  { path: '', component: FooterComponent},
  { path: '', component: NavbarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
