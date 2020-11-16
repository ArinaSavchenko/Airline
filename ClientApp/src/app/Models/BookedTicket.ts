import { User } from './User';
import { Ticket } from './Ticket';

export interface BookedTicket{
  id?: number;
  passport: string;
  passengerFirstName: string;
  passengerLastName: string;
  carryOnBagsNumber: number;
  baggageNumber: number;
  totalPrice: number;
  status: string;
  user: User;
  ticket: Ticket;
}
