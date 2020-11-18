import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Flight } from '../Models/Flight';
import { FlightForSearch } from '../Models/FlightForSearch';
import { ResponseModel } from '../Models/ResponseModel';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
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

  addFlight(flight): Observable<number> {
    return this.http.post<number>(this.flightsUrl, flight, this.httpOptions);
  }

  updateFlight(flight): Observable<ResponseModel> {
    const url = `${this.flightsUrl}/${flight.id}`;
    return this.http.put<ResponseModel>(url, flight, this.httpOptions).pipe(
      catchError(error => this.handleError(error))
    );
  }

  deleteFlight(id: number): Observable<ResponseModel> {
    const url = `${this.flightsUrl}/${id}`;
    return this.http.delete<ResponseModel>(url, this.httpOptions).pipe(
      catchError(error => this.handleError(error))
    );
  }

  handleError(error: HttpErrorResponse): Observable<any> {
    return of(error.error);
  }
}
