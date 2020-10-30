import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Observable } from 'rxjs';

import { Airport } from './Models/Airport';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb(): any {
    const airports = [
      { id: 1, name: 'Dr Nice', city: 'Minsk', country: 'Belarus' },
      { id: 2, name: 'Narco', city: 'London', country: 'The UK' },
      { id: 3, name: 'Sam', city: 'Moscow', country: 'Russia' },
    ];

    const airplanes = [
      { id: 1, name: 'someName1', seatsNumber: 30, maxWeight: 450}
    ];

    return { airports, airplanes };
  }

  genId(airports: Airport[]): number {
    return airports.length > 0 ? Math.max(...airports.map(airport => airport.id)) + 1 : 11;
  }
}
