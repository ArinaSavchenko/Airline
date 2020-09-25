import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { FlightForSearch } from './FlightForSearch';

@Injectable({
  providedIn: 'root',
})

export class SharedService {

  private flightTo = new BehaviorSubject({});
  private flightBack = new BehaviorSubject({});
  sharedFlightTo = this.flightTo.asObservable();
  sharedFlightBack = this.flightBack.asObservable();

  nextFlightTo(flight: FlightForSearch): void {
    this.flightTo.next(flight);
  }

  nextFlightBack(flight: FlightForSearch): void {
    this.flightBack.next(flight);
  }
}
