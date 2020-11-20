import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as signalR from '@microsoft/signalr';

import { Observable, Subject } from 'rxjs';

import { ReservedSeat } from './Models/ReservedSeat';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignalRService implements OnDestroy {

  url = environment.baseUrl;
  flightId: number;

  private sharedObj = new Subject<ReservedSeat[]>();

  private connection: any = new signalR.HubConnectionBuilder()
    .withUrl(this.url + '/seatslock')
    .configureLogging(signalR.LogLevel.Information)
    .build();

  readonly POST_URL = this.url + '/api/selected-seats';

  constructor(private http: HttpClient) {
    this.connection.on('ReceiveLockedSeats', (seats) => {
      this.mapReceivedSeats(seats);
    });
  }

  public async start(flightId: number) {
    try {
      this.flightId = flightId;
      await this.connection.invoke('AddToGroup', flightId);
      await this.connection.start();
      console.log('connected');
    } catch (err) {
      console.log(err);
      setTimeout(() => this.start(flightId), 5000);
    }
  }

  private mapReceivedSeats(seats): void {
    this.sharedObj.next(seats);
  }

  public selectSeat(seat: ReservedSeat): void {
    this.http.post(this.POST_URL, seat).subscribe();
  }

  public retrieveMappedObject(): Observable<ReservedSeat[]> {
    return this.sharedObj.asObservable();
  }

  public unselectSeat(flightId: number, seatId: number): void {
    const url = `${this.url}?flightId=${flightId}&seatId=${seatId}`;
    this.http.delete(url).subscribe();
  }

  ngOnDestroy(): void {
    this.connection.invoke('LeaveGroup', this.flightId);
  }
}
