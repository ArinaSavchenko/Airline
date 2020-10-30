import { TicketType } from './TicketType';

export interface Ticket {
  id: number;
  ticketType: TicketType;
  flightId: number;
  price: number;
}
