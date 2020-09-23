import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { Airport } from './Airport';

@Injectable({
  providedIn: 'root',
})

export class AirportService{

  private airportsUrl = 'https://localhost:44392/api/airports';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  /** GET */
  getAirports(): Observable<Airport[]>{
    return this.http.get<Airport[]>(this.airportsUrl);
  }

  searchAirports(term: string): Observable<Airport[]>{
    if (!term.trim()){
      return this.getAirports();
    }
    return  this.http.get<Airport[]>(`${this.airportsUrl}/?value=${term}`);
  }

}
