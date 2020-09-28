import { Component, OnInit } from '@angular/core';

import { Observable, of, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Flight } from '../Models/Flight';
import { FlightService } from '../Services/flight.service';
import { SharedService } from '../Services/Shared.service';
import { FlightForSearch } from '../Models/FlightForSearch';

@Component({
  selector: 'app-flight-search-results',
  templateUrl: './flight-search-results.component.html',
  styleUrls: ['./flight-search-results.component.css']
})
export class FlightSearchResultsComponent implements OnInit {

  flightsTo$: Observable<Flight[]>;
  flightsBack$: Observable<Flight[]>;
  flightTo: FlightForSearch;
  flightBack: FlightForSearch;
  private searchTermsTo = new Subject<FlightForSearch>();
  private searchTermsBack = new Subject<FlightForSearch>();

  constructor(private sharedService: SharedService, private flightService: FlightService) { }

  search(): void {
    this.searchTermsTo.next(this.flightTo);
    if (this.flightBack.departureAirportId){
      this.searchTermsBack.next(this.flightBack);
    }
  }

  ngOnInit(): void {
    this.sharedService.sharedFlightTo.subscribe(flight => this.flightTo = flight);
    this.sharedService.sharedFlightBack.subscribe(flight => this.flightBack = flight);

    this.searchTermsTo.pipe(
      distinctUntilChanged(),
      switchMap((term: FlightForSearch) => this.flightService.searchFlights(term)),
    ).subscribe( results => this.flightsTo$ = of(results));

    this.searchTermsBack.pipe(
      distinctUntilChanged(),
      switchMap((term: FlightForSearch) => this.flightService.searchFlights(term)),
    ).subscribe( results => this.flightsBack$ = of(results));
    this.search();
  }
}
