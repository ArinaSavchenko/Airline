import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule} from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatListModule } from '@angular/material/list';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { FlightsInfoComponent } from './flights-info/flights-info.component';
import { AppRoutingModule } from './app-rounting.module';
import { AirportsInfoComponent } from './airports-info/airports-info.component';
import { AirplanesInfoComponent } from './airplanes-info/airplanes-info.component';
import { AccountComponent } from './account/account.component';
import { RegistrationComponent } from './registration/registration.component';
import { AirportAddingComponent } from './airport-adding/airport-adding.component';
import { AirportDetailsComponent } from './airport-details/airport-details.component';
import { ConfirmActionDialogComponent } from './confirm-action-dialog/confirm-action-dialog.component';
import { AirplaneAddingComponent } from './airplane-adding/airplane-adding.component';
import { AirplaneDetailsComponent } from './airplane-details/airplane-details.component';
import { TicketsInfoComponent } from './tickets-info/tickets-info.component';
import { LogInComponent } from './log-in/log-in.component';
import { AuthGuard } from './AuthGuard';
import { UserDetailsComponent } from './user-details/user-details.component';
import { SeatsSchemeComponent } from './seats-scheme/seats-scheme.component';
import { FlightDetailsComponent } from './flight-details/flight-details.component';
import { FlightAddingComponent } from './flight-adding/flight-adding.component';
import { TicketsTypeInfoComponent } from './ticket-types-info/tickets-type-info.component';
import { TicketTypeAddingComponent } from './ticket-type-adding/ticket-type-adding.component';
import { TicketTypeDetailsComponent } from './ticket-type-details/ticket-type-details.component';
import { TicketAddingComponent } from './ticket-adding/ticket-adding.component';

export function tokenGetter(): any {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FlightsInfoComponent,
    AirportsInfoComponent,
    AirplanesInfoComponent,
    AccountComponent,
    RegistrationComponent,
    AirportAddingComponent,
    AirportDetailsComponent,
    ConfirmActionDialogComponent,
    AirplaneAddingComponent,
    AirplaneDetailsComponent,
    TicketsInfoComponent,
    LogInComponent,
    UserDetailsComponent,
    SeatsSchemeComponent,
    FlightDetailsComponent,
    FlightAddingComponent,
    TicketsTypeInfoComponent,
    TicketTypeAddingComponent,
    TicketTypeDetailsComponent,
    TicketAddingComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatButtonModule,
        AppRoutingModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        MatInputModule,
        MatOptionModule,
        MatDatepickerModule,
        MatIconModule,
        MatNativeDateModule,
        HttpClientModule,
        FormsModule,
        MatDialogModule,
        MatRadioModule,
        FlexLayoutModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                allowedDomains: ['localhost:44392'],
                disallowedRoutes: []
            }
        }),
        MatSelectModule,
        MatListModule,
        NgxMatTimepickerModule,
        NgxMatDatetimePickerModule,
        NgxMatNativeDateModule,
        MatCheckboxModule
    ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
