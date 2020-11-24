import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Ticket } from '../Models/Ticket';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})

export class TicketsService {

  private ticketsUrl = environment.baseUrl + '/tickets';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  getTicket(id: number): Observable<Ticket> {
    const url = `${this.ticketsUrl}/${id}`;
    return this.http.get<Ticket>(url);
  }
}
