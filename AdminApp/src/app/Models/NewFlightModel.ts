export interface NewFlightModel {
  id: number;
  departureAirportId: number;
  arrivalAirportId: number;
  departureDate: Date;
  arrivalDate: Date;
  status: string;
  airplaneId: number;
}
