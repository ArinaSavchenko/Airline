import { Component } from '@angular/core';
import { SeatType } from '../Models/SeatType';

@Component({
  selector: 'app-seats-scheme',
  templateUrl: './seats-scheme.component.html',
  styleUrls: ['./seats-scheme.component.css']
})
export class SeatsSchemeComponent {

  selectedSeatType: string;
  types = [ 'Business', 'Standard' ];
  sectorName: string;
  sectorNumber: string;
  column: string;
  seats: number;
  sectors: [];
  seatsScheme = [];
  visible = true;
  airplane = [];
  seatsGroupedBySectorName = [];
  seatsGroupedBySectorNumber = [];
  seatsGroupedByColumn = [];

  groupBy(array, key): Array<any> {
    return array.reduce((result, currentValue) => {
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      return result;
    }, []);
  }

  onSubmit(): void {
    for (let seatNumber = 1; seatNumber < this.seats; seatNumber++) {
      const seat: SeatType = {
        column: this.column,
        sectorName: this.sectorName,
        sectorNumber: this.sectorNumber,
        seat: seatNumber,
        type: this.selectedSeatType
      };

      this.seatsScheme.push(seat);
    }

    this.seatsGroupedBySectorName = this.groupBySectorName(this.seatsScheme);
    this.seatsGroupedBySectorNumber = this.groupBySectorNumber(this.seatsGroupedBySectorName);
    this.seatsGroupedByColumn = this.groupByColumn(this.seatsGroupedBySectorName);
    this.seatsGroupedByColumn.sort();
    console.log(this.seatsGroupedByColumn);
  }

  groupBySectorName(array): any {
    return this.groupBy(array, 'sectorName');
  }

  groupBySectorNumber(array): any {
    for (const property in array){
      if (array.hasOwnProperty(property)) {
        array[property] = this.groupBy(array[property], 'sectorNumber');
      }
    }
    return array;
  }

  groupByColumn(array): any {
    for (const property in array){
      if (array.hasOwnProperty(property)) {
        for (const innerProperty in array[property]){
          if (array[property].hasOwnProperty(innerProperty)) {
            array[property][innerProperty] = this.groupBy(array[property][innerProperty], 'column');
          }
        }
      }
    }
    return array;
  }
}
