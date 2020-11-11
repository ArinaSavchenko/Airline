import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Airport } from '../Models/Airport';
import { ResponseModel } from '../Models/ResponseModel';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AirportService {

  private airportsUrl = environment.baseUrl + '/airports';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  getAirports(): Observable<Airport[]> {
    return this.http.get<Airport[]>(this.airportsUrl);
  }

  getAirport(id: number): Observable<Airport> {
    const url = `${this.airportsUrl}/${id}`;
    return this.http.get<Airport>(url);
  }

  searchAirports(term: string): Observable<Airport[]> {
    if (!term.trim()) {
      return this.getAirports();
    }
    return this.http.get<Airport[]>(`${this.airportsUrl}/?value=${term}`);
  }

  addAirport(airport: Airport): Observable<any> {
    return this.http.post(this.airportsUrl, airport, this.httpOptions);
  }

  updateAirport(airport: Airport): Observable<ResponseModel> {
    const url = `${this.airportsUrl}/${airport.id}`;
    return this.http.put<ResponseModel>(url, airport, this.httpOptions).pipe(
      catchError(error => this.handleError(error))
    );
  }

  deleteAirport(id: number): Observable<ResponseModel> {
    const url = `${this.airportsUrl}/${id}`;
    return this.http.delete<ResponseModel>(url, this.httpOptions).pipe(
      catchError(error => this.handleError(error))
    );
  }

  handleError(error: HttpErrorResponse): Observable<any> {
    return of(error.error);
  }
}
