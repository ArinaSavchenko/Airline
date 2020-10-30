import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Airplane } from '../Models/Airplane';

@Injectable({ providedIn: 'root' })
export class AirplaneService {

  private airplanesUrl = 'api/airplanes';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getAirplanes(): Observable<Airplane[]> {
    return this.http.get<Airplane[]>(this.airplanesUrl);
  }

  getAirplane(id: number): Observable<Airplane> {
    const url = `${this.airplanesUrl}/${id}`;
    return this.http.get<Airplane>(url);
  }

  searchAirplanes(value: string): Observable<Airplane[]> {
    if (!value) {
      return this.getAirplanes();
    }

    return this.http.get<Airplane[]>(`${this.airplanesUrl}/?name=${value}`);
  }

  addAirplane(airplane: Airplane): Observable<Airplane> {
    return this.http.post<Airplane>(this.airplanesUrl, airplane, this.httpOptions);
  }

  updateAirplane(airplane: Airplane): Observable<any> {
    return this.http.put(this.airplanesUrl, airplane, this.httpOptions);
  }

  deleteAirplane(airplane: Airplane): Observable<any> {
    const url = `${this.airplanesUrl}/${airplane.id}`;
    return this.http.delete(url, this.httpOptions);
  }
}
