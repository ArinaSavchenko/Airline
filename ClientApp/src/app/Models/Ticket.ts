import { TicketType } from './TicketType';
import { Flight } from './Flight';

export interface Ticket {
  id: number;
  ticketType: TicketType;
  flightId: number;
  price: number;
  ticketsLeftNumber: number;
  status: string;
  flight: Flight;
}
