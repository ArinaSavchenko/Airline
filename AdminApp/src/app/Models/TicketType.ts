export interface TicketType {
  id: number;
  name: string;
  carryOnBagsNumber: number;
  carryOnBagMaxWeight: number;
  baggageNumber: number;
  baggageMaxWeight: number;
  pricePerExtraCarryOnBag: number;
  pricePerExtraCarryOnBagKg: number;
  pricePerExtraBaggage: number;
  pricePerExtraBaggageKg: number;
  seatReservation: boolean;
  changes: boolean;
  refund: string;
  seatType: string;
}
