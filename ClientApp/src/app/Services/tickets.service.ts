import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { environment } from '../../environments/environment';
import { Ticket } from '../Models/Ticket';

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
    // tslint:disable-next-line:no-debugger
    debugger;
    const url = `${this.ticketsUrl}/${id}`;
    return this.http.get<Ticket>(url);
  }
}
