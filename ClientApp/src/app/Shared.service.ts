import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { FlightForSearch } from './FlightForSearch';

@Injectable({
  providedIn: 'root',
})

export class SharedService {

  empty1: FlightForSearch  = {
    departure: 0,
    arrival: 0,
    date: new Date()
  };

  empty2: FlightForSearch  = {
    departure: 0,
    arrival: 0,
    date: new Date()
  };

  private flightTo = new BehaviorSubject(this.empty1);
  private flightBack = new BehaviorSubject(this.empty2);
  sharedFlightTo = this.flightTo.asObservable();
  sharedFlightBack = this.flightBack.asObservable();

  nextFlightTo(flight: FlightForSearch): void {
    this.flightTo.next(flight);
  }

  nextFlightBack(flight: FlightForSearch): void {
    this.flightBack.next(flight);
  }
}
