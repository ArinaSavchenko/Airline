import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { environment } from '../../environments/environment';
import { BookedTicket } from '../Models/BookedTicket';
import { NewBookedTicket } from '../Models/NewBookedTIcket';
import { TicketWasBookedResponse } from '../Models/TicketWasBookedResponse';

@Injectable({
  providedIn: 'root',
})

export class BookedTicketsService {

  private bookedTicketUrl = environment.baseUrl + '/booked-tickets';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  getBookedTicket(id: number): Observable<BookedTicket>{
    const url = `${this.bookedTicketUrl}/${id}`;
    return this.http.get<BookedTicket>(url);
  }

  postBookedTicket(tickets: NewBookedTicket[]): Observable<TicketWasBookedResponse[]> {
    return this.http.post<TicketWasBookedResponse[]>(this.bookedTicketUrl, tickets, this.httpOptions);
  }
}
