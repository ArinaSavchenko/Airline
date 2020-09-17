import {Airport} from './Airport';
import {Time} from '@angular/common';

export interface Flight{
  id: number;
  departure: Airport;
  arrival: Airport;
  date: Date;
  departure_time: Date;
  arrival_time: Date;
  flight_length: Time;
}
