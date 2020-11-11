import { Airport } from './Airport';
import { Ticket } from './Ticket';
import { Airplane } from './Airplane';

export interface Flight {
  id: number;
  departureAirport: Airport;
  arrivalAirport: Airport;
  departureDate: Date;
  arrivalDate: Date;
  tickets?: Ticket[];
  status: string;
  airplane?: Airplane;
}
