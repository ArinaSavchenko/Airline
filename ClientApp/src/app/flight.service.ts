import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { Flight } from './Flight';
import { FlightForSearch } from './FlightForSearch';

@Injectable({
  providedIn: 'root',
})

export class FlightService{

  private flightsUrl = 'api/flights';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  getFlights(): Observable<Flight[]>{
    return this.http.get<Flight[]>(this.flightsUrl);
  }

  searchFlights(flight: FlightForSearch): Observable<Flight[]>{
    if (!flight.departure || !flight.arrival){
      return of([]);
    }
    return  this.http.get<Flight[]>(`${this.flightsUrl}/?departure=${flight.departure}&&arrival=${flight.arrival}&&date=${flight.date}`);
  }
}
