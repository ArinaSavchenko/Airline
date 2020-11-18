import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule} from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule} from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { MainPageComponent } from './main-page/main-page.component';
import { CarouselComponent } from './carousel/carousel.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { FlightsSearchBarComponent } from './flights-search-bar/flights-search-bar.component';
import { FlightSearchResultsComponent } from './flight-search-results/flight-search-results.component';
import { LogInComponent } from './log-in/log-in.component';
import { RegistrationComponent } from './registration/registration.component';
import { AccountComponent } from './account/account.component';
import { AuthGuard } from './AuthGuard';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ConfirmActionDialogComponent } from './confirm-action-dialog/confirm-action-dialog.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { BookTicketsComponent } from './book-tickets/book-tickets.component';
import { TicketBookingFormComponent } from './ticket-booking-form/ticket-booking-form.component';
import { BookingResultComponent } from './booking-result/booking-result.component';
import { BookingsHistoryComponent } from './bookings-history/bookings-history.component';
import { BookedTicketDetailsComponent } from './booked-ticket-details/booked-ticket-details.component';
import { CheckInComponent } from './check-in/check-in.component';
import { SeatReservationComponent } from './seat-reservation/seat-reservation.component';

export function tokenGetter(): any {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    MainPageComponent,
    CarouselComponent,
    SearchBarComponent,
    FlightsSearchBarComponent,
    FlightSearchResultsComponent,
    LogInComponent,
    RegistrationComponent,
    AccountComponent,
    UserDetailsComponent,
    ConfirmActionDialogComponent,
    ChangePasswordComponent,
    BookTicketsComponent,
    TicketBookingFormComponent,
    BookingResultComponent,
    BookingsHistoryComponent,
    BookedTicketDetailsComponent,
    CheckInComponent,
    SeatReservationComponent
  ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        MatButtonModule,
        BrowserAnimationsModule,
        MatTabsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatOptionModule,
        MatAutocompleteModule,
        MatRadioModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        HttpClientModule,
        MatExpansionModule,
        MatDialogModule,
        MatIconModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: tokenGetter,
            whitelistedDomains: ['localhost:44392'],
            blacklistedRoutes: []
          }
        }),
      MatListModule,
      MatCheckboxModule,
      MatSnackBarModule
    ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})

export class AppModule { }
