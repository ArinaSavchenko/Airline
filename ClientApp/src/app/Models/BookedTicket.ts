export interface BookedTicket{
  departureCity: string;
  departureCountry: string;
  arrivalCity: string;
  arrivalCountry: string;
  date: Date;
  seatTypeName: string;
  seatReservation: boolean;
  passengerFirstName: string;
  passengerLastName: string;
  carryOnBagsNumber: number;
  baggageNumber: number;
  totalPrice: number;
}
