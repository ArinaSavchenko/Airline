import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPageComponent} from './main-page/main-page.component';
import { FlightSearchResultsComponent } from './flight-search-results/flight-search-results.component';
import { RegistrationComponent } from './registration/registration.component';
import { AccountComponent } from './account/account.component';
import { AuthGuard } from './AuthGuard';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { BookTicketsComponent } from './book-tickets/book-tickets.component';
import { BookingResultComponent } from './booking-result/booking-result.component';

const routes: Routes = [
  { path: 'airline', component: MainPageComponent},
  { path: '', redirectTo: '/airline', pathMatch: 'full'},
  { path: 'search', component: FlightSearchResultsComponent},
  { path: 'airline/registration', component: RegistrationComponent },
  { path: 'airline/account', canActivate: [AuthGuard], component: AccountComponent },
  { path: 'airline/account/details', canActivate: [AuthGuard], component: UserDetailsComponent},
  { path: 'airline/account/change-password', canActivate: [AuthGuard], component: ChangePasswordComponent},
  { path: 'booking', canActivate: [AuthGuard], component: BookTicketsComponent},
  { path: 'booking-results', canActivate: [AuthGuard], component: BookingResultComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
{}
