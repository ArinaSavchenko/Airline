import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPageComponent} from './main-page/main-page.component';
import { FlightSearchResultsComponent } from './flight-search-results/flight-search-results.component';
import {RegistrationComponent} from './registration/registration.component';
import {Action} from 'rxjs/internal/scheduler/Action';
import {AccountComponent} from './account/account.component';

const routes: Routes = [
  { path: 'airline', component: MainPageComponent},
  { path: '', redirectTo: '/airline', pathMatch: 'full'},
  { path: 'search', component: FlightSearchResultsComponent},
  { path: 'airline/registration', component: RegistrationComponent },
  { path: 'airline/account', component: AccountComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
