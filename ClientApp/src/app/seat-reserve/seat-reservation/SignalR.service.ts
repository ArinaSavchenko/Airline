import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import * as signalR from '@microsoft/signalr';

import { Observable, Subject } from 'rxjs';

import { ReservedSeat } from '../../Models/ReservedSeat';
import { SeatToBeSelectedModel } from '../../Models/SeatToBeSelectedModel';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignalRService implements OnDestroy {

  url = environment.baseUrl;
  flightId: number;

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  private sharedObj = new Subject<ReservedSeat[]>();

  private connection: any = new signalR.HubConnectionBuilder()
    .withUrl('https://localhost:44392/seatslock')
    .configureLogging(signalR.LogLevel.Information)
    .build();

  readonly POST_URL = this.url + '/selected-seats';

  constructor(private http: HttpClient) {
    this.connection.on('ReceiveLockedSeats', (seats) => {
      this.mapReceivedSeats(seats);
    });
  }

  public async start(flightId: number) {
    try {
      this.flightId = flightId;
      if (this.connection.state === 'Disconnected') {
        await this.connection.start();
        this.connection.invoke('AddToGroup', flightId);
      }
      console.log(this.connection.state);
    } catch (err) {
      console.log('ERROR');
      console.log(err);
      setTimeout(() => this.start(flightId), 5000);
    }
  }

  private mapReceivedSeats(seats): void {
    this.sharedObj.next(seats);
  }

  public selectSeat(seat: SeatToBeSelectedModel): void {
    this.http.post(this.POST_URL, seat, this.httpOptions).subscribe();
  }

  public retrieveMappedObject(): Observable<ReservedSeat[]> {
    return this.sharedObj.asObservable();
  }

  public unselectSeat(bookedTicketId: number, seatId: number): void {
    const url = `${this.url}/selected-seats?bookedTicketId=${bookedTicketId}&seatId=${seatId}`;
    this.http.delete(url).subscribe();
  }

  destroy() {
    this.connection.invoke('LeaveGroup', this.flightId);
    this.connection.onclose();
  }

  ngOnDestroy() {
    this.destroy();
  }
}
