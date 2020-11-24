import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';

import * as moment from 'moment';

import { Airport } from '../../Models/Airport';
import { Airplane } from '../../Models/Airplane';
import { FlightService } from '../flight.service';
import { AirportService } from '../../airports/airport.service';
import { AirplaneService } from '../../airplanes/airplane.service';
import { FlightStatuses } from '../../Enums/FlightStatuses';

@Component({
  selector: 'app-flight-adding',
  templateUrl: './flight-adding.component.html',
  styleUrls: ['./flight-adding.component.css']
})
export class FlightAddingComponent implements OnInit {

  airports: Airport[];
  airplanes: Airplane[];
  flightStatuses = FlightStatuses;
  private searchTermsAirports = new Subject<string>();
  private searchTermsAirplanes = new Subject<string>();
  flightForm: FormGroup;
  message: string;

  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private flightService: FlightService,
    private location: Location,
    private airportService: AirportService,
    private airplaneService: AirplaneService,
    private formBuilder: FormBuilder) {
    this.flightForm = this.formBuilder.group({
      departureAirport: new FormControl(null, Validators.required),
      arrivalAirport: new FormControl(null, Validators.required),
      departureDate: new FormControl(null, Validators.required),
      arrivalDate: new FormControl(null, Validators.required),
      airplane: new FormControl(null, Validators.required),
      status: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
    this.searchTermsAirports.pipe(
      distinctUntilChanged(),
      switchMap(value => this.airportService.searchAirports(value))
    ).subscribe(airports => {
      this.airports = airports.filter(airport => airport.status === 'Active');
      this.filterAirports();
    });
    this.searchTermsAirplanes.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      switchMap((value: string) => this.airplaneService.searchAirplanes(value))
    ).subscribe(airplanes => {
      this.airplanes = airplanes.filter(airplane => airplane.status === 'Active');
    });
  }

  displayFnForAirport(subject): string {
    return subject ? `${subject.city}, ${subject.country}` : undefined;
  }

  displayFnForAirplane(subject): string {
    return subject ? `${subject.name}` : undefined;
  }

  searchAirports(value): void {
    this.searchTermsAirports.next(value);
  }

  searchAirplanes(value): void {
    this.searchTermsAirplanes.next(value);
  }

  goBack(): void {
    this.location.back();
  }

  addFlight(): void {
    if (this.flightForm.valid) {
      const flight = {
        departureAirportId: this.flightForm.controls.departureAirport.value.id,
        arrivalAirportId: this.flightForm.controls.arrivalAirport.value.id,
        departureDate: moment(this.flightForm.controls.departureDate.value).format('YYYY-MM-DDTHH:mm:00.000Z'),
        arrivalDate: moment(this.flightForm.controls.arrivalDate.value).format('YYYY-MM-DDTHH:mm:00.000Z'),
        airplaneId: this.flightForm.controls.airplane.value.id,
        status: this.flightForm.controls.status.value
      };
      this.flightService.addFlight(flight)
        .subscribe((flightId) => this.router.navigate([`/admin/flights/tickets/${flightId}`]),
          error => {
          this.message = 'Error while adding has occurred';
          });
    }
  }

  filterAirports(): void {
    if (this.flightForm.controls.departureAirport.value) {
      this.airports = this.airports.filter(airport => airport.id !== this.flightForm.controls.departureAirport.value.id);
    }
    if (this.flightForm.controls.arrivalAirport.value) {
      this.airports = this.airports.filter(airport => airport.id !== this.flightForm.controls.arrivalAirport.value.id);
    }
  }
}
