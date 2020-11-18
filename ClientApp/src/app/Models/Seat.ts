export interface Seat {
  id: number;
  column: string;
  sectorName: string;
  sectorNumber: number;
  number: number;
  type: string;
  airplaneId: number;
  isReserved?: boolean;
  isSelected?: boolean;
}
