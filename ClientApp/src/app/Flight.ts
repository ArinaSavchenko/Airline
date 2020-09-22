import { Time } from '@angular/common';

export interface Flight{
  id: number;
  departure: number;
  arrival: number;
  date: Date;
  departure_time: Date;
  arrival_time: Date;
  flight_length: Time;
  tickets_left: number;
  price: number;
}
