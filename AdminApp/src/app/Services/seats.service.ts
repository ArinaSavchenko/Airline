import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Seat } from '../Models/Seat';
import { environment } from '../../environments/environment';

@Injectable( {providedIn: 'root'} )
export class SeatsService {

  private seatsUrl = environment.baseUrl + '/seats-scheme';

  httpOptions = {
    headers: new HttpHeaders( {'Content-Type': 'application/json'} )
  };

  constructor(private http: HttpClient) {
  }

  getSeats(airplaneId: number): Observable<Seat[]> {
    return this.http.get<Seat[]>( this.seatsUrl + '?airplaneId=' + airplaneId );
  }

  addSeats(seats: Seat[]): Observable<any> {
    return this.http.post( this.seatsUrl, seats, this.httpOptions );
  }
}
