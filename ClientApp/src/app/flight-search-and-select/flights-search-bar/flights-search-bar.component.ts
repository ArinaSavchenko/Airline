import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

import { Airport } from '../../Models/Airport';
import { AirportService } from '../airport.service';
import { PasswordsMatchValidator } from '../../Validators/PasswordsMatchValidator';
import { TypeMatchValidator } from '../../Validators/TypeMatchValidator';

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
  ticketsNumberFormat = '^[0-9]+$';

  constructor(private airportService: AirportService,
              private changes: ChangeDetectorRef,
              private router: Router,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.flightForm = this.formBuilder.group({
      departureAirport: new FormControl(null, Validators.required),
      arrivalAirport: new FormControl(null, Validators.required),
      ticketType: new FormControl(this.ticketType),
      dateTo: new FormControl(null, Validators.required),
      dateBack: new FormControl(null),
      ticketsNumber: new FormControl(1, [Validators.required, Validators.min(1),
            Validators.pattern(this.ticketsNumberFormat)])
    });

    this.flightForm.setValidators(TypeMatchValidator('departureAirport', 'Airport'));

    this.maxDate.setDate(this.today.getDate() + this.dateInterval);

    this.airports$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.airportService.searchAirports(term))
    );

    this.airports$.subscribe(airports => {
      this.airports = airports;
      if (this.flightForm.controls.departureAirport.value) {
        this.airports = this.airports.filter(airport => airport.id !== this.flightForm.controls.departureAirport.value.id);
      }
      if (this.flightForm.controls.arrivalAirport.value) {
        this.airports = this.airports.filter(airport => airport.id !== this.flightForm.controls.arrivalAirport.value.id);
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
    if (this.ticketType === 'OneWay') {
      this.flightForm.get('dateBack').clearValidators();
    }
    if (this.ticketType === 'Return') {
      this.flightForm.get('dateBack').setValidators([Validators.required]);
    }
    this.flightForm.get('dateBack').updateValueAndValidity();
  }

  sendSearchRequest(): void {
    this.router.navigate(['/search'], {
      queryParams: {
        departureAirportId: this.flightForm.controls.departureAirport.value.id,
        arrivalAirportId: this.flightForm.controls.arrivalAirport.value.id,
        dateTo: this.flightForm.controls.dateTo.value,
        dateBack: this.ticketType === 'Return' ? this.flightForm.controls.dateBack.value : null,
        ticketType: this.ticketType,
        ticketsNumber: this.flightForm.controls.ticketsNumber.value
      }
    });
  }
}
