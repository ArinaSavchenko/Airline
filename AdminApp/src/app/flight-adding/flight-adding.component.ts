import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

import { Airport } from '../Models/Airport';
import { Airplane } from '../Models/Airplane';
import { FlightService } from '../Services/flight.service';
import { AirportService } from '../Services/airport.service';
import { AirplaneService } from '../Services/airplane.service';
import { FlightStatuses } from '../Enums/FlightStatuses';

@Component( {
  selector: 'app-flight-adding',
  templateUrl: './flight-adding.component.html',
  styleUrls: ['./flight-adding.component.css']
} )
export class FlightAddingComponent implements OnInit {

  airports: Airport[];
  airplanes$: Observable<Airplane[]>;
  flightStatuses = FlightStatuses;
  private searchTermsAirport = new Subject<string>();
  private searchTermsAirplanes = new Subject<string>();
  flightForm: FormGroup;

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
    this.flightForm = this.formBuilder.group( {
      departureAirport: new FormControl( null ),
      arrivalAirport: new FormControl( null ),
      departureDate: new FormControl( null ),
      arrivalDate: new FormControl( null ),
      airplane: new FormControl( null ),
      status: new FormControl( null )
    } );
  }

  ngOnInit(): void {
    this.searchTermsAirport.pipe(
      distinctUntilChanged(),
      switchMap( value => this.airportService.searchAirports( value ) )
    ).subscribe( airports => {
      this.airports = airports;
      if (this.flightForm.controls.departureAirport.value) {
        this.airports = this.airports.filter( airport => airport.id !== this.flightForm.controls.departureAirport.value.id );
      }
      if (this.flightForm.controls.arrivalAirport.value) {
        this.airports = this.airports.filter( airport => airport.id !== this.flightForm.controls.arrivalAirport.value.id );
      }
    } );
    this.airplanes$ = this.searchTermsAirplanes.pipe(
      debounceTime( 100 ),
      distinctUntilChanged(),
      switchMap( (value: string) => this.airplaneService.searchAirplanes( value ) )
    );
  }

  displayFnForAirport(subject): string {
    return subject ? `${subject.city}, ${subject.country}` : undefined;
  }

  displayFnForAirplane(subject): string {
    return subject ? `${subject.name}` : undefined;
  }

  searchAirports(value): void {
    this.searchTermsAirport.next( value );
  }

  searchAirplanes(value): void {
    this.searchTermsAirplanes.next( value );
  }

  goBack(): void {
    this.location.back();
  }

  addFlight(): void {
    if (this.flightForm.valid) {
      const flight = {
        departureAirportId: this.flightForm.controls.departureAirport.value.id,
        arrivalAirportId: this.flightForm.controls.arrivalAirport.value.id,
        departureDate: this.flightForm.controls.departureDate.value,
        arrivalDate: this.flightForm.controls.arrivalDate.value,
        airplaneId: this.flightForm.controls.airplane.value.id,
        status: this.flightForm.controls.status.value
      };
      this.flightService.addFlight( flight )
        .subscribe( (flightId) => this.router.navigate( [`/admin/flights/tickets/${flightId}`] ) );
    }
  }
}
