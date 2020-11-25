import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ReservedSeat } from '../Models/ReservedSeat';
import { ResponseModel } from '../Models/ResponseModel';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})

export class ReservedSeatsService {

  private reservedSeatsUrl = environment.baseUrl + '/reserved-seats';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  getReservedAndSelectedSeats(bookedTicketId: number): Observable<ReservedSeat[]> {
    const url = `${this.reservedSeatsUrl}?bookedTicketId=${bookedTicketId}`;
    return this.http.get<ReservedSeat[]>(url);
  }

  reserveSeat(reservedSeat: ReservedSeat): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(this.reservedSeatsUrl, reservedSeat, this.httpOptions);
  }

  getReservedSeats(bookedTicketId: number): Observable<ReservedSeat[]> {
    const url = `${this.reservedSeatsUrl}/check?bookedTicketId=${bookedTicketId}`;
    return this.http.get<ReservedSeat[]>(url);
  }
}
