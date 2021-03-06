import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

import { Airport } from '../Models/Airport';
import { FlightForSearch } from '../Models/FlightForSearch';
import { AirportService } from '../Services/airport.service';

@Component({
  selector: 'app-flights-search-bar',
  templateUrl: './flights-search-bar.component.html',
  styleUrls: ['./flights-search-bar.component.css']
})

export class FlightsSearchBarComponent implements OnInit, AfterViewChecked {

  ticketType = 'OneWay';
  flightForm: FormGroup;

  airports: Airport[];
  airports$: Observable<Airport[]>;
  private searchTerms = new Subject<string>();

  today = new Date();
  dateInterval = 180;
  minDate = this.today;
  maxDate = new Date();

  constructor(private airportService: AirportService,
              private changes: ChangeDetectorRef,
              private router: Router,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.flightForm = this.formBuilder.group({
      departureAirportId: new FormControl(null, Validators.required),
      arrivalAirportId: new FormControl(null, Validators.required),
      ticketType: new FormControl(this.ticketType),
      dateTo: new FormControl(null, Validators.required),
      dateBack: new FormControl(null),
      ticketsNumber: new FormControl(1, Validators.min(1))
    });

    this.maxDate.setDate(this.today.getDate() + this.dateInterval);

    this.airports$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.airportService.searchAirports(term))
    );

    this.airports$.subscribe(airports => {
      this.airports = airports;
      if (this.flightForm.controls.departureAirportId.value) {
        this.airports = this.airports.filter(airport => airport.id !== this.flightForm.controls.departureAirportId.value.id);
      }
      if (this.flightForm.controls.arrivalAirportId.value) {
        this.airports = this.airports.filter(airport => airport.id !== this.flightForm.controls.arrivalAirportId.value.id);
      }
    });
  }

  ngAfterViewChecked(): void {
    this.changes.detectChanges();
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  displayFn(subject): string {
    return subject ? `${subject.city}, ${subject.country}` : undefined;
  }

  setDepartureAirportId(subject): void {
    this.airports = this.airports.filter(airport => airport.id !== subject.id);
  }

  setArrivalAirportId(subject): void {
    this.airports = this.airports.filter(airport => airport.id !== subject.id);
  }

  setDateTo(date): void {
    this.minDate = date;
  }

  setDateBack(date): void {
    this.maxDate = date;
  }

  OnTicketTypeChange(value): void {
    this.ticketType = value;
  }

  sendSearchRequest(): void {
    this.router.navigate(['/search'], {
      queryParams: {
        departureAirportId: this.flightForm.controls.departureAirportId.value.id,
        arrivalAirportId: this.flightForm.controls.arrivalAirportId.value.id,
        dateTo: this.flightForm.controls.dateTo.value,
        dateBack: this.flightForm.controls.dateBack.value,
        ticketType: this.ticketType,
        ticketsNumber: this.flightForm.controls.ticketsNumber.value
      }
    });
  }
}
