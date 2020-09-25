import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

import { Airport } from '../Airport';
import { FlightForSearch } from '../FlightForSearch';
import { SharedService } from '../Shared.service';
import { AirportService } from '../airport.service';

@Component({
  selector: 'app-flights-search-bar',
  templateUrl: './flights-search-bar.component.html',
  styleUrls: ['./flights-search-bar.component.css']
})

export class FlightsSearchBarComponent implements OnInit, AfterViewChecked{

  flightForSearchTo: FlightForSearch;
  flightForSearchBack: FlightForSearch;
  ticketType = 'OneWay';

  myForm = new FormGroup({
    departure: new FormControl(null, Validators.required),
    arrival: new FormControl(null, Validators.required),
    ticketType: new FormControl(this.ticketType),
    dateTo: new FormControl(null, Validators.required),
    dateBack: new FormControl(null),
    amount: new FormControl(1, Validators.required)
  });

  airports$: Observable<Airport[]>;
  private searchTerms = new Subject<string>();

  today = new Date();

  constructor(private airportService: AirportService, private sharedService: SharedService,
              private changes: ChangeDetectorRef) {}

  ngOnInit(): void{
    this.sharedService.sharedFlightTo.subscribe(flight => this.flightForSearchTo = flight);
    this.sharedService.sharedFlightBack.subscribe(flight => this.flightForSearchBack = flight);
    this.airports$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.airportService.searchAirports(term))
    );
  }

  ngAfterViewChecked(): void{
    this.changes.detectChanges();
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  displayFn(subject): string{
    return subject ? `${subject.city}, ${subject.country}` : undefined;
  }

  setDeparture(subject): void{
    this.flightForSearchTo.departure = subject.airportId;
  }

  setArrival(arrival): void{
    this.flightForSearchTo.arrival = arrival.airportId;
  }

  setAmount(amount): void{
    // TODO: Delete comments, when Database tickets will be created
    // this.flightForSearchTo.amount = +amount;
  }

  setDateTo(date): void{
    this.flightForSearchTo.date = new Date(date).toUTCString();
  }

  setDateBack(date): void{
    this.flightForSearchBack.date = new Date(date).toUTCString();
  }

  OnTicketTypeChange(value): void{
    this.ticketType = value;
  }

  sendSearchRequest(): void{
    this.sharedService.nextFlightTo(this.flightForSearchTo);
    if (this.ticketType === 'Return'){
      this.flightForSearchBack.departure = this.flightForSearchTo.arrival;
      this.flightForSearchBack.arrival = this.flightForSearchTo.departure;
      // TODO: Delete comments, when Database tickets will be created
      // this.flightForSearchBack.amount = this.flightForSearchTo.amount;
    }
    this.sharedService.nextFlightBack(this.flightForSearchBack);
  }

}
