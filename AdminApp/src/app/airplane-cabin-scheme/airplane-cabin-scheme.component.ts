import { Component, Input, OnInit } from '@angular/core';
import { SeatPosition } from '../Models/SeatType';

const MAX_COLUMNS = 32;
const MAX_ROWS = 18;

@Component({
  selector: 'app-airplane-cabin-scheme',
  templateUrl: './airplane-cabin-scheme.component.html',
  styleUrls: ['./airplane-cabin-scheme.component.css']
})
export class AirplaneCabinSchemeComponent implements OnInit {

  @Input() schemaData: SeatPosition[];
  @Input() activeSeatType: string;

  columns = Array(MAX_COLUMNS).fill(1).map((x, i) => i);
  rows = Array(MAX_ROWS).fill(1).map((x, i) => i);
  activeSeat;

  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    this.drawSchema();
  }

  selectSeat(selectedRow, selectedColumn): void {
    if (!this.activeSeatType) {
      return;
    }
    const seat = {seat: selectedColumn, row: selectedRow, type: this.activeSeatType};
    let status: boolean;
    status = this.checkSeat(seat);
    this.colorizeSeat(this.countIndex(seat), status);
  }

  private colorizeSeat(index: number, status: boolean, type: string = this.activeSeatType): void {
    const element = document.getElementsByClassName('seat')[index];
    element.classList.remove('common', 'sofa', 'vip');
    if (status) {
      element.classList.add(type);
    }
  }

  private countIndex(seat: SeatPosition): number {
    return seat.row * this.columns.length + seat.seat;
  }

  private checkSeat(seat: SeatPosition): boolean {
    if (this.schemaData.find(s => s.row === seat.row && s.seat === seat.seat)) {
      this.removeSeat(seat);
      return false;
    }
    this.addSeat(seat);
    this.updateSelectedSeatsData();
    return true;
  }

  private removeSeat(seat: SeatPosition): void {
    this.schemaData = this.schemaData.filter(savedSeat => savedSeat.row !== seat.row || savedSeat.seat !== seat.seat);
    this.updateSelectedSeatsData();
  }

  private addSeat(seat: SeatPosition): void {
    this.schemaData.push(seat);
  }

  private drawSchema(): void {
    for (const seat of this.schemaData) {
      this.colorizeSeat(this.countIndex(seat), true, seat.type);
    }
  }

  updateSelectedSeatsData(): void {
  }

  updateSelectedHint(selectedRow, selectedColumn): void {
  }

  deleteSelectedHint(): void {
  }

}
