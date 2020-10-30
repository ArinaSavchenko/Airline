import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, switchMap} from 'rxjs/operators';

import { Airport } from '../Models/Airport';
import { FlightForSearch } from '../Models/FlightForSearch';
import { Flight } from '../Models/Flight';
import { AirportService } from '../Services/airport.service';
import { FlightService } from '../Services/flight.service';

@Component({
  selector: 'app-flights',
  templateUrl: './flights-info.component.html',
  styleUrls: ['./flights-info.component.css']
})
export class FlightsInfoComponent implements OnInit {

  flight: FlightForSearch = {};
  airports: Airport[];
  flights$: Observable<Flight[]>;
  private searchTermsFlight = new Subject<FlightForSearch>();
  private searchTermsAirport = new Subject<string>();

  constructor(
    private airportService: AirportService,
    private flightService: FlightService
    ) {
  }

  ngOnInit(): void {
    this.flights$ = this.searchTermsFlight.pipe(
      distinctUntilChanged(),
      switchMap((flight: FlightForSearch) => this.flightService.searchFlights(flight))
    );
    this.searchTermsAirport.pipe(
      distinctUntilChanged(),
      switchMap(value => this.airportService.searchAirports(value))
    ).subscribe(airports => {
        this.airports = airports;
        if (this.flight.departureAirportId) {
          this.airports = this.airports.filter(airport => airport.id !== this.flight.departureAirportId);
        }
        if (this.flight.arrivalAirportId) {
          this.airports = this.airports.filter(airport => airport.id !== this.flight.arrivalAirportId);
        }
    });
  }

  displayFn(subject): string {
    return subject ? `${subject.city}, ${subject.country}` : undefined;
  }

  searchFlights(): void {
    this.searchTermsFlight.next(this.flight);
  }

  searchAirports(value): void {
    this.searchTermsAirport.next(value);
  }

  setDepartureAirportId(value): void {
    this.flight.departureAirportId = value.id;
    console.log(this.flight.departureAirportId);
  }

  setArrivalAirportId(value): void {
    this.flight.arrivalAirportId = value.id;
    console.log(this.flight);
  }
}
