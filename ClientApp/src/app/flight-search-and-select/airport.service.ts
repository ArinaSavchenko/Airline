import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Airport } from '../Models/Airport';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})

export class AirportService {

  private airportsUrl = environment.baseUrl + '/airports';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  getAirports(): Observable<Airport[]> {
    return this.http.get<Airport[]>(`${this.airportsUrl}/?status=Active`);
  }

  searchAirports(term: string): Observable<Airport[]> {
    if (!term.trim()) {
      return this.getAirports();
    }

    return this.http.get<Airport[]>(`${this.airportsUrl}/?value=${term}&status=Active`);
  }
}
