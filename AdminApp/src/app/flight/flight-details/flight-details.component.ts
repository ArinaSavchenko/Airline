import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Flight } from '../../Models/Flight';
import { Airport } from '../../Models/Airport';
import { Airplane } from '../../Models/Airplane';
import { ResponseModel } from '../../Models/ResponseModel';
import { AirplaneService } from '../../airplanes/airplane.service';
import { AirportService } from '../../airports/airport.service';
import { FlightService } from '../flight.service';
import { ConfirmActionDialogComponent } from '../../confirm-action-dialog/confirm-action-dialog.component';
import { FlightStatuses } from '../../Enums/FlightStatuses';
import * as moment from 'moment';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.css']
})
export class FlightDetailsComponent implements OnInit {

  @ViewChild(MatTable, {static: true}) table: MatTable<any>;

  airports: Airport[];
  airplanes$: Observable<Airplane[]>;
  flightStatuses = FlightStatuses;
  private searchTermsAirport = new Subject<string>();
  private searchTermsAirplanes = new Subject<string>();
  flight: Flight;
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
    private route: ActivatedRoute,
    private flightService: FlightService,
    private location: Location,
    public dialog: MatDialog,
    private airportService: AirportService,
    private airplaneService: AirplaneService,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.getFlight();
    this.searchTermsAirport.pipe(
      distinctUntilChanged(),
      switchMap(value => this.airportService.searchAirports(value))
    ).subscribe(airports => {
      this.airports = airports;
      if (this.flightForm.controls.departureAirport.value) {
        this.airports = this.airports.filter(airport => airport.id !== this.flightForm.controls.departureAirport.value.id);
      }
      if (this.flightForm.controls.arrivalAirport.value) {
        this.airports = this.airports.filter(airport => airport.id !== this.flightForm.controls.arrivalAirport.value.id);
      }
    });
    this.airplanes$ = this.searchTermsAirplanes.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      switchMap((value: string) => this.airplaneService.searchAirplanes(value))
    );
  }

  getFlight(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.flightService.getFlight(id)
      .subscribe(flight => {
        this.flight = flight;
        this.flightForm = this.formBuilder.group({
          id: this.flight.id,
          departureAirport: new FormControl(this.flight.departureAirport, Validators.required),
          arrivalAirport: new FormControl(this.flight.arrivalAirport, Validators.required),
          departureDate: new FormControl(this.flight.departureDate, Validators.required),
          arrivalDate: new FormControl(this.flight.arrivalDate, Validators.required),
          airplane: new FormControl(this.flight.airplane, Validators.required),
          status: new FormControl(this.flight.status, Validators.required)
        });
      });
  }

  displayFnForAirport(subject): string {
    return subject ? `${subject.city}, ${subject.country}` : undefined;
  }

  displayFnForAirplane(subject): string {
    return subject ? `${subject.name}` : undefined;
  }

  searchAirports(value): void {
    this.searchTermsAirport.next(value);
  }

  searchAirplanes(value): void {
    this.searchTermsAirplanes.next(value);
  }

  onSave(): void {
    if (this.flightForm.valid) {
      this.openDialog('Are you sure that you want to save changes?');
    }
  }

  onDelete(): void {
    this.openDialog('Are you sure that you want to delete this flight?');
  }

  save(): void {
    const flight = {
      id: this.flight.id,
      departureAirport: this.flightForm.controls.departureAirport.value,
      arrivalAirport: this.flightForm.controls.arrivalAirport.value,
      departureDate: moment(this.flightForm.controls.departureDate.value).format('YYYY-MM-DDTHH:mm:00.000Z'),
      arrivalDate: moment(this.flightForm.controls.arrivalDate.value).format('YYYY-MM-DDTHH:mm:00.000Z'),
      airplane: this.flightForm.controls.airplane.value,
      status: this.flightForm.controls.status.value
    };
    this.flightService.updateFlight(flight)
      .subscribe(response => this.checkResult(response));
  }

  delete(): void {
    this.flightService.deleteFlight(this.flight.id)
      .subscribe(response => this.checkResult(response));
  }

  openDialog(value: string): void {
    const dialogRef = this.dialog.open(ConfirmActionDialogComponent, {
      data: value
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === true) {
        switch (value) {
          case 'Are you sure that you want to save changes?': {
            this.save();
            break;
          }
          case 'Are you sure that you want to delete this flight?': {
            this.delete();
            break;
          }
        }
      }
    });
  }

  setDepartureAirport(value): void {
    this.airports = this.airports.filter(airport => airport.id !== value);
  }

  setArrivalAirport(value): void {
    this.airports = this.airports.filter(airport => airport.id !== value.id);
  }

  checkResult(response: ResponseModel): void {
    if (!response.success) {
      this.message = response.message;
    } else {
      this.goBack();
    }
  }

  goBack(): void {
    this.location.back();
  }
}
