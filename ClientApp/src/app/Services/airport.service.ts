import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { Airport } from '../Models/Airport';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})

export class AirportService{

  private airportsUrl = environment.baseUrl + '/airports';  // URL to web api

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
