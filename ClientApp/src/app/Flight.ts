import { Time } from '@angular/common';

export interface Flight{
  id: number;
  departure: number;
  arrival: number;
  departure_date: Date;
  arrival_date: Date;
  flight_length: Time;
  tickets_left: number;
  price: number;
}
