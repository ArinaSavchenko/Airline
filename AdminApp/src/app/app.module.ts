import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatOptionModule, NativeDateModule} from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule} from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { FlexLayoutModule } from '@angular/flex-layout';

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
    AirplaneDetailsComponent
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
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {dataEncapsulation: false}
    ),
    FormsModule,
    MatDialogModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
