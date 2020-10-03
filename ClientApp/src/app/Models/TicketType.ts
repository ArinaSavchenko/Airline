export interface TicketType {
  id: number;
  name: string;
  carryOnBagsNumber?: number;
  carryOnBagMaxWeight?: number;
  baggageNumber?: number;
  baggageMaxWeight?: number;
  seatReservation: boolean;
  changes: boolean;
  refund?: boolean;
}
