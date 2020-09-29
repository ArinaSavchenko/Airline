import { TicketType } from './TicketType';

export interface Ticket {
  id: number;
  ticketType: TicketType;
  price: number;
}
