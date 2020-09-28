import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Flight } from '../Models/Flight';
import { FlightForSearch } from '../Models/FlightForSearch';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})

export class FlightService {

  private flightsUrl = environment.baseUrl + '/flights';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  getFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(this.flightsUrl);
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

    console.log(options.params);
    return this.http.get<Flight[]>(this.flightsUrl, options);
  }
}
