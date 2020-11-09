import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Ticket } from '../Models/Ticket';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TicketService {

    private ticketsUrl = environment.baseUrl + '/tickets';  // URL to web api

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient) { }

    getTickets(flightId: number): Observable<Ticket[]> {
        return this.http.get<Ticket[]>(this.ticketsUrl + '?flightId=' + flightId);
    }

    addTicket(tickets: Ticket[]): Observable<any> {
        return this.http.post(this.ticketsUrl, tickets, this.httpOptions);
    }
}
