import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

import { Airport } from '../Models/Airport';
import { FlightForSearch } from '../Models/FlightForSearch';
import { SharedService } from '../Services/Shared.service';
import { AirportService } from '../Services/airport.service';

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
    departureAirportId: new FormControl(null, Validators.required),
    arrivalAirportId: new FormControl(null, Validators.required),
    ticketType: new FormControl(this.ticketType),
    dateTo: new FormControl(null, Validators.required),
    dateBack: new FormControl(null),
    ticketsNumber: new FormControl(1, Validators.min(1))
  });

  airports: Airport[];
  airports$: Observable<Airport[]>;
  private searchTerms = new Subject<string>();

  today = new Date();
  maxDate =  new Date(new Date(this.today).getTime() + 1000 * 60 * 60 * 24 * 180);
  minDate = new Date();

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
    this.airports$.subscribe(airports => {
      this.airports = airports;
      if (this.myForm.controls.departureAirportId.value){
        this.airports = this.airports.filter(airport => airport.id !== this.myForm.controls.departureAirportId.value.id);
      }
      if (this.flightForSearchTo.arrivalAirportId){
        this.airports = this.airports.filter(airport => airport.id !== this.myForm.controls.arrivalAirportId.value.id);
      }
    });
    this.flightForSearchTo.ticketsNumber = 1;
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

  setDepartureAirportId(subject): void{
    this.flightForSearchTo.departureAirportId = subject.id;
    this.airports = this.airports.filter(airport => airport.id !== subject.id);
  }

  setArrivalAirportId(subject): void{
    this.flightForSearchTo.arrivalAirportId = subject.id;
    this.airports = this.airports.filter(airport => airport.id !== subject.id);
  }

  setTicketsNumber(ticketsNumber): void{
    this.flightForSearchTo.ticketsNumber = +ticketsNumber;
    if (this.ticketType === 'Return')
    {
      this.flightForSearchBack.ticketsNumber = +ticketsNumber;
    }
  }

  setDateTo(date): void{
    this.minDate = date;
    this.flightForSearchTo.date = new Date(date).toUTCString();
  }

  setDateBack(date): void{
    this.maxDate = date;
    this.flightForSearchBack.date = new Date(date).toUTCString();
  }

  OnTicketTypeChange(value): void{
    this.ticketType = value;
  }

  sendSearchRequest(): void{
    this.sharedService.nextFlightTo(this.flightForSearchTo);
    if (this.ticketType === 'Return'){
      this.flightForSearchBack.departureAirportId = this.flightForSearchTo.arrivalAirportId;
      this.flightForSearchBack.arrivalAirportId = this.flightForSearchTo.departureAirportId;
    }
    this.sharedService.nextFlightBack(this.flightForSearchBack);
  }
}
