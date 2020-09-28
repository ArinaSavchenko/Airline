import { Airport } from './Airport';
import { Ticket } from './Ticket';

export interface Flight{
  flightId: number;
  departureAirport: Airport;
  arrivalAirport: Airport;
  departureDate: Date;
  arrivalDate: Date;
  tickets: Ticket[];
}
