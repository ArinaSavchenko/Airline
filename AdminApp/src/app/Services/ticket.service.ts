import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { Ticket } from '../Models/Ticket';
import { environment } from '../../environments/environment';
import { ResponseModel } from '../Models/ResponseModel';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private ticketsUrl = environment.baseUrl + '/tickets';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  getTicket(id: number): Observable<Ticket> {
    const url = `${this.ticketsUrl}/${id}`;
    return this.http.get<Ticket>(url);
  }

  getTickets(flightId: number): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.ticketsUrl + '?flightId=' + flightId);
  }

  addTicket(ticket: Ticket): Observable<any> {
    return this.http.post(this.ticketsUrl, ticket, this.httpOptions);
  }

  updateTicket(ticket: Ticket): Observable<ResponseModel> {
    const url = `${this.ticketsUrl}/${ticket.id}`;
    return this.http.put<ResponseModel>(url, ticket, this.httpOptions).pipe(
      catchError(error => this.handleError(error))
    );
  }

  deleteTicket(id: number): Observable<ResponseModel> {
    const url = `${this.ticketsUrl}/${id}`;
    return this.http.delete<ResponseModel>(url, this.httpOptions).pipe(
      catchError(error => this.handleError(error))
    );
  }

  handleError(error: HttpErrorResponse): Observable<any> {
    return of(error.error);
  }
}
