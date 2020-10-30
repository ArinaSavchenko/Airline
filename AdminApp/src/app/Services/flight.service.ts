import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import {Observable, of} from 'rxjs';

import { Flight } from '../Models/Flight';
import {FlightForSearch} from '../Models/FlightForSearch';


@Injectable({ providedIn: 'root' })
export class FlightService {

  private flightsUrl = 'api/flights';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(this.flightsUrl);
  }

  getFlight(id: number): Observable<Flight> {
    const url = `${this.flightsUrl}/${id}`;
    return this.http.get<Flight>(url);
  }

  searchFlights(flight: FlightForSearch): Observable<Flight[]> {
    if (!flight) {
      return of([]);
    }

    const options = {
      params: new HttpParams()
    };

    Object.keys(flight).forEach(key => {
      options.params = options.params.set(key, flight[key]);
    });

    return this.http.get<Flight[]>(this.flightsUrl, options);
  }

  addFlight(flight: Flight): Observable<Flight> {
    return this.http.post<Flight>(this.flightsUrl, flight, this.httpOptions);
  }

  updateFlight(flight: Flight): Observable<any> {
    return this.http.put(this.flightsUrl, flight, this.httpOptions);
  }

  deleteFlight(flight: Flight): Observable<any> {
    const url = `${this.flightsUrl}/${flight.id}`;
    return this.http.delete(url, this.httpOptions);
  }
}
