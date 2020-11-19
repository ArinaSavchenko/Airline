import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainPageComponent } from './main-page-view/main-page/main-page.component';
import { FlightSearchResultsComponent } from './flight-search-and-select/flight-search-results/flight-search-results.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { AccountComponent } from './user/account/account.component';
import { AuthGuard } from './AuthGuard';
import { UserDetailsComponent } from './user/user-details/user-details.component';
import { ChangePasswordComponent } from './user/change-password/change-password.component';
import { BookTicketsComponent } from './tickets-booking/book-tickets/book-tickets.component';
import { BookingResultComponent } from './tickets-booking/booking-result/booking-result.component';
import { BookingsHistoryComponent } from './user/booking-history/bookings-history/bookings-history.component';
import { BookedTicketDetailsComponent } from './user/booking-history/booked-ticket-details/booked-ticket-details.component';
import { SeatReservationComponent } from './seat-reserve/seat-reservation/seat-reservation.component';

const routes: Routes = [
  {path: 'airline', component: MainPageComponent},
  {path: '', redirectTo: '/airline', pathMatch: 'full'},
  {path: 'search', component: FlightSearchResultsComponent},
  {path: 'airline/registration', component: RegistrationComponent},
  {path: 'airline/account', canActivate: [AuthGuard], component: AccountComponent},
  {path: 'airline/account/details', canActivate: [AuthGuard], component: UserDetailsComponent},
  {path: 'airline/account/change-password', canActivate: [AuthGuard], component: ChangePasswordComponent},
  {path: 'booking', canActivate: [AuthGuard], component: BookTicketsComponent},
  {path: 'booking-results', canActivate: [AuthGuard], component: BookingResultComponent},
  {path: 'airline/account/bookings-history', canActivate: [AuthGuard], component: BookingsHistoryComponent},
  {path: 'airline/account/bookings-history/:id', canActivate: [AuthGuard], component: BookedTicketDetailsComponent},
  {path: 'airline/seat-reservation/:id', component: SeatReservationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}

{
}
