import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import {Airport} from './Airport';
import {Time} from '@angular/common';

// import { Airport } from './Airport';

@Injectable({
  providedIn: 'root',
})

export class InMemoryDataService implements InMemoryDbService {

  createDb(): any {
    const airports = [
      { id: 1, name: 'Airport1', city: 'Minsk', country: 'Belarus' },
      { id: 2, name: 'Airport2', city: 'Moscow', country: 'Russia' },
      { id: 3, name: 'Airport3', city: 'Stockholm', country: 'Sweden' },
      { id: 4, name: 'Airport4', city: 'Paris', country: 'France' },
      { id: 5, name: 'Airport5', city: 'Helsinki', country: 'Finland' },
      { id: 6, name: 'Airport6', city: 'Berlin', country: 'Germany' },
      { id: 7, name: 'Airport7', city: 'Tokyo', country: 'Japan' },
      { id: 8, name: 'Airport8', city: 'Singapore', country: 'Singapore' },
      { id: 9, name: 'Airport9', city: 'Bangkok', country: 'Thailand' },
      { id: 10, name: 'Airport10', city: 'Washington', country: 'United States of America' },
    ];
    const flights = [
      {
        id: 1, departure: 1, arrival:  2, date: new Date(), departure_time: new Date(), arrival_time: new Date(),
        flight_length: 0, tickets_left: 0, price: 0
      },
      {
        id: 2, departure: 2, arrival:  1, date: new Date(), departure_time: new Date(), arrival_time: new Date(),
        flight_length: 0, tickets_left: 0, price: 0
      },
    ];
    return {airports, flights};
  }

  // genId(airports: Airport[]): number {
  //   return airports.length > 0 ? Math.max(...airports.map(airport => airport.id)) + 1 : 11;
  // }
}
