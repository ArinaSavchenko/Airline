import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Airport } from '../Models/Airport';


@Injectable({ providedIn: 'root' })
export class AirportService {

  private airportsUrl = 'api/airports';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getAirports(): Observable<Airport[]> {
    return this.http.get<Airport[]>(this.airportsUrl);
  }

  getAirport(id: number): Observable<Airport> {
    const url = `${this.airportsUrl}/${id}`;
    return this.http.get<Airport>(url);
  }

  searchAirports(term: string): Observable<Airport[]> {
    if (!term.trim()){
      return this.getAirports();
    }
    return  this.http.get<Airport[]>(`${this.airportsUrl}/?city=${term}`);
  }

  addAirport(airport: Airport): Observable<Airport> {
    return this.http.post<Airport>(this.airportsUrl, airport, this.httpOptions);
  }

  updateAirport(airport: Airport): Observable<any> {
    return this.http.put(this.airportsUrl, airport, this.httpOptions);
  }

  deleteAirport(airport: Airport): Observable<any> {
    const url = `${this.airportsUrl}/${airport.id}`;
    return this.http.delete(url, this.httpOptions);
  }
}
