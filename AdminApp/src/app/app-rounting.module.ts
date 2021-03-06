import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './AuthGuard';

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
import { TicketsInfoComponent } from './tickets-info/tickets-info.component';
import { LogInComponent } from './log-in/log-in.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { SeatsSchemeComponent } from './seats-scheme/seats-scheme.component';
import { FlightDetailsComponent } from './flight-details/flight-details.component';
import { FlightAddingComponent } from './flight-adding/flight-adding.component';
import { TicketsTypeInfoComponent } from './ticket-types-info/tickets-type-info.component';
import { TicketTypeAddingComponent } from './ticket-type-adding/ticket-type-adding.component';
import { TicketTypeDetailsComponent } from './ticket-type-details/ticket-type-details.component';
import { TicketAddingComponent } from './ticket-adding/ticket-adding.component';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [

  { path: 'admin/log-in', component: LogInComponent},
  { path: 'admin/menu', canActivate: [AuthGuard], component: MenuComponent},
  { path: '', redirectTo: 'admin/menu', pathMatch: 'full'},
  { path: 'admin/flights', canActivate: [AuthGuard], component: FlightsInfoComponent},
  { path: 'admin/airports', canActivate: [AuthGuard], component: AirportsInfoComponent},
  { path: 'admin/airplanes', canActivate: [AuthGuard], component: AirplanesInfoComponent},
  { path: 'admin/account', canActivate: [AuthGuard], component: AccountComponent},
  { path: 'admin/registration', canActivate: [AuthGuard], component: RegistrationComponent},
  { path: 'admin/airports/new', canActivate: [AuthGuard], component: AirportAddingComponent},
  { path: 'admin/airports/:id', canActivate: [AuthGuard], component: AirportDetailsComponent},
  { path: 'admin/airplanes/new', canActivate: [AuthGuard], component: AirplaneAddingComponent},
  { path: 'admin/airplanes/:id', canActivate: [AuthGuard], component: AirplaneDetailsComponent},
  { path: 'admin/tickets', canActivate: [AuthGuard], component: TicketsInfoComponent},
  { path: 'admin/account/details', canActivate: [AuthGuard], component: UserDetailsComponent},
  { path: 'admin/airplane/seats-scheme/:airplaneId', canActivate: [AuthGuard], component: SeatsSchemeComponent},
  { path: 'admin/flights/new', canActivate: [AuthGuard], component: FlightAddingComponent},
  { path: 'admin/flights/:id', canActivate: [AuthGuard], component: FlightDetailsComponent},
  { path: 'admin/flights/tickets/:id', canActivate: [AuthGuard], component: TicketsInfoComponent},
  { path: 'admin/ticket-types', canActivate: [AuthGuard], component: TicketsTypeInfoComponent},
  { path: 'admin/ticket-type/new', canActivate: [AuthGuard], component: TicketTypeAddingComponent},
  { path: 'admin/ticket-type/:id', canActivate: [AuthGuard], component: TicketTypeDetailsComponent},
  { path: 'admin/flights/tickets/:id/new', canActivate: [AuthGuard], component: TicketAddingComponent},
  { path: 'admin/tickets/:id', canActivate: [AuthGuard], component: TicketDetailsComponent},
  { path: 'admin/account/change-password', canActivate: [AuthGuard], component: ChangePasswordComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
