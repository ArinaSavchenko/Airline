export interface NewBookedTicket{
  ticketId: number;
  userId: number;
  passport: string;
  passengerFirstName: string;
  passengerLastName: string;
  carryOnBagsNumber: number;
  baggageNumber: number;
  totalPrice: number;
  status: string;
}
