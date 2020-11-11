import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Airplane } from '../Models/Airplane';
import { ResponseModel } from '../Models/ResponseModel';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AirplaneService {

  private airplanesUrl = environment.baseUrl + '/airplanes';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  getAirplanes(): Observable<Airplane[]> {
    return this.http.get<Airplane[]>(this.airplanesUrl);
  }

  getAirplane(id: number): Observable<Airplane> {
    if (id === null) {
      return null;
    }
    const url = `${this.airplanesUrl}/${id}`;
    return this.http.get<Airplane>(url);
  }

  searchAirplanes(value: string): Observable<Airplane[]> {
    if (!value.trim()) {
      return this.getAirplanes();
    }

    return this.http.get<Airplane[]>(`${this.airplanesUrl}?name=${value}`);
  }

  addAirplane(airplane: Airplane): Observable<number> {
    return this.http.post<number>(this.airplanesUrl, airplane, this.httpOptions);
  }

  updateAirplane(airplane: Airplane): Observable<ResponseModel> {
    const url = `${this.airplanesUrl}/${airplane.id}`;
    return this.http.put<ResponseModel>(url, airplane, this.httpOptions).pipe(
      catchError(error => this.handleError(error))
    );
  }

  deleteAirplane(id: number): Observable<ResponseModel> {
    const url = `${this.airplanesUrl}/${id}`;
    return this.http.delete<ResponseModel>(url, this.httpOptions).pipe(
      catchError(error => this.handleError(error))
    );
  }

  handleError(error: HttpErrorResponse): Observable<any> {
    return of(error.error);
  }
}
