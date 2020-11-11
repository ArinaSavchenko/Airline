import { Injectable } from '@angular/core';

import { Seat } from '../Models/Seat';

@Injectable({
  providedIn: 'root'
})
export class SeatsSchemeService {


  seatsGroupedBySectorName = {};
  seatsGroupedBySectorNumber = {};
  seatsGroupedByColumn = {};
  theCabin = [];

  drawScheme(seats: Seat[]): any {
    this.seatsGroupedBySectorName = this.groupBySectorName(seats);
    this.seatsGroupedBySectorNumber = this.groupBySectorNumber(this.seatsGroupedBySectorName);
    this.seatsGroupedByColumn = this.groupByColumn(this.seatsGroupedBySectorName);
    this.theCabin = Object.values(this.seatsGroupedByColumn);
    this.theCabin = this.getSeatsValues(this.theCabin);
    this.theCabin = this.getInnerSeatsValues(this.theCabin);
    return this.theCabin;
  }

  groupBy(array, key): any {
    return array.reduce((result, currentValue) => {
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      return result;
    }, {});
  }

  groupBySectorName(array): any {
    return this.groupBy(array, 'sectorName');
  }

  groupBySectorNumber(array): any {
    for (const property in array) {
      if (array.hasOwnProperty(property)) {
        array[property] = this.groupBy(array[property], 'sectorNumber');
      }
    }
    return array;
  }

  groupByColumn(array): any {
    for (const property in array) {
      if (array.hasOwnProperty(property)) {
        for (const innerProperty in array[property]) {
          if (array[property].hasOwnProperty(innerProperty)) {
            array[property][innerProperty] = this.groupBy(array[property][innerProperty], 'column');
          }
        }
      }
    }

    return array;
  }

  getSeatsValues(array): any {
    for (const property in array) {
      if (array.hasOwnProperty(property)) {
        array[property] = Object.values(array[property]);
      }
    }
    return array;
  }

  getInnerSeatsValues(array): any {
    for (const property in array) {
      if (array.hasOwnProperty(property)) {
        for (const innerProperty in array[property]) {
          if (array[property].hasOwnProperty(innerProperty)) {
            array[property][innerProperty] = Object.values(array[property][innerProperty]);
          }
        }
      }
    }
    return array;
  }
}
