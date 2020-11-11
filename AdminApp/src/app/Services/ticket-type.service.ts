import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ResponseModel } from '../Models/ResponseModel';
import { TicketType } from '../Models/TicketType';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketTypeService {

  private ticketTypesUrl = environment.baseUrl + '/ticket-types';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  getTicketTypes(): Observable<TicketType[]> {
    return this.http.get<TicketType[]>(this.ticketTypesUrl);
  }

  getTicketType(id: number): Observable<TicketType> {
    if (id === null) {
      return null;
    }
    const url = `${this.ticketTypesUrl}/${id}`;
    return this.http.get<TicketType>(url);
  }

  addTicketType(ticketType: TicketType): Observable<any> {
    return this.http.post(this.ticketTypesUrl, ticketType, this.httpOptions);
  }

  updateTicketType(ticketType: TicketType): Observable<ResponseModel> {
    const url = `${this.ticketTypesUrl}/${ticketType.id}`;
    return this.http.put<ResponseModel>(url, ticketType, this.httpOptions).pipe(
      catchError(error => this.handleError(error))
    );
  }

  deleteTicketType(id: number): Observable<ResponseModel> {
    const url = `${this.ticketTypesUrl}/${id}`;
    return this.http.delete<ResponseModel>(url, this.httpOptions).pipe(
      catchError(error => this.handleError(error))
    );
  }

  handleError(error: HttpErrorResponse): Observable<any> {
    return of(error.error);
  }
}
