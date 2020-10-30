import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MenuComponent } from './menu/menu.component';
import { FlightsInfoComponent } from './flights-info/flights-info.component';
import { AirportsInfoComponent } from './airports-info/airports-info.component';
import { AirplanesInfoComponent } from './airplanes-info/airplanes-info.component';
import { AccountComponent } from './account/account.component';
import { RegistrationComponent } from './registration/registration.component';
import { AirportAddingComponent } from './airport-adding/airport-adding.component';
import { AirportDetailsComponent } from './airport-details/airport-details.component';
import { AirplaneAddingComponent } from './airplane-adding/airplane-adding.component';
import { AirplaneDetailsComponent } from './airplane-details/airplane-details.component';

const routes: Routes = [
  { path: 'admin/menu', component: MenuComponent},
  { path: '', redirectTo: 'admin/menu', pathMatch: 'full'},
  { path: 'admin/flights', component: FlightsInfoComponent},
  { path: 'admin/airports', component: AirportsInfoComponent},
  { path: 'admin/airplanes', component: AirplanesInfoComponent},
  { path: 'admin/account', component: AccountComponent},
  { path: 'admin/registration', component: RegistrationComponent},
  { path: 'admin/airports/new', component: AirportAddingComponent},
  { path: 'admin/airports/:id', component: AirportDetailsComponent},
  { path: 'admin/airplanes/new', component: AirplaneAddingComponent},
  { path: 'admin/airplanes/:id', component: AirplaneDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
