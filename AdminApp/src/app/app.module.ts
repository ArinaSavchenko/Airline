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
import { AirplaneCabinSchemeComponent } from './airplane-cabin-scheme/airplane-cabin-scheme.component';
import { AirplaneAddingComponent } from './airplane-adding/airplane-adding.component';
import { AirplaneDetailsComponent } from './airplane-details/airplane-details.component';
import { TicketsInfoComponent } from './tickets-info/tickets-info.component';
import { LogInComponent } from './log-in/log-in.component';
import { AuthGuard } from './AuthGuard';
import { UserDetailsComponent } from './user-details/user-details.component';

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
    AirplaneCabinSchemeComponent,
    AirplaneAddingComponent,
    AirplaneDetailsComponent,
    TicketsInfoComponent,
    LogInComponent,
    UserDetailsComponent
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
    FlexLayoutModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:44392'],
        disallowedRoutes: []
      }
    })
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
