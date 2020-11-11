import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';

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
  private searchTermsAirport = new Subject<string>();

  myForm = new FormGroup({
    departureAirportId: new FormControl(null),
    arrivalAirportId: new FormControl(null),
    date: new FormControl(null)
  });

  constructor(
    private airportService: AirportService,
    private flightService: FlightService
  ) {
  }

  ngOnInit(): void {
    this.searchTermsAirport.pipe(
      distinctUntilChanged(),
      switchMap(value => this.airportService.searchAirports(value))
    ).subscribe(airports => {
      this.airports = airports;
      if (this.myForm.controls.departureAirportId.value) {
        this.airports = this.airports.filter(airport => airport.id !== this.myForm.controls.departureAirportId.value.id);
      }
      if (this.myForm.controls.arrivalAirportId.value) {
        this.airports = this.airports.filter(airport => airport.id !== this.myForm.controls.arrivalAirportId.value.id);
      }
    });
  }

  displayFn(subject): string {
    return subject ? `${subject.city}, ${subject.country}` : undefined;
  }

  searchFlights(): void {
    this.flights$ = this.flightService.searchFlights(this.flight);
  }

  searchAirports(value): void {
    this.searchTermsAirport.next(value);
  }

  setDepartureAirportId(value): void {
    this.flight.departureAirportId = value.id;
    this.airports = this.airports.filter(airport => airport.id !== value.id);
    this.searchFlights();
  }

  setArrivalAirportId(value): void {
    this.flight.arrivalAirportId = value.id;
    this.airports = this.airports.filter(airport => airport.id !== value.id);
    this.searchFlights();
  }

  setDate(value): void {
    this.flight.date = new Date(value).toUTCString();
    this.searchFlights();
  }
}
