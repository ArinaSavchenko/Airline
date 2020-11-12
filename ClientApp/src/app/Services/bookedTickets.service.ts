import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { environment } from '../../environments/environment';
import { BookedTicket } from '../Models/BookedTicket';

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

  postBookedTicket(bookedTicket: BookedTicket): Observable<any> {
    return this.http.post(this.bookedTicketUrl, bookedTicket, this.httpOptions);
  }
}
