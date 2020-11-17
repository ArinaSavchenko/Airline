import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Seat } from '../Models/Seat';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})

export class SeatService {

  private seatsSchemeUrl = environment.baseUrl + '/seats-scheme';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  getAirplaneScheme(bookedTicketId: number): Observable<Seat[]> {
    const url = `${this.seatsSchemeUrl}/booked-tickets?bookedTicketId=${bookedTicketId}`;
    return this.http.get<Seat[]>(url);
  }
}
