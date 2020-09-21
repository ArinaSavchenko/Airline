import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, map, startWith, switchMap
} from 'rxjs/operators';

import { AirportService } from '../airport.service';
import { Airport } from '../Airport';

@Component({
  selector: 'app-airport-search',
  templateUrl: './airport-search.component.html',
  styleUrls: ['./airport-search.component.css']
})
export class AirportSearchComponent implements OnInit {

  @Output() departureEvent = new EventEmitter<number>();
  @Output() arrivalEvent = new EventEmitter<number>();
  myControl = new FormControl();
  airports$: Observable<Airport[]>;
  private searchTerms = new Subject<string>();

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.airports$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.airportService.searchAirports(term))
    );
  }

  displayFn(subject): string{
    return subject ? `${subject.city}, ${subject.country}` : undefined;
  }

  setDeparture(dep: number): void{
    this.departureEvent.emit(dep);
  }

  setArrival(arr: number): void{
    this.arrivalEvent.emit(arr);
  }

  constructor(private airportService: AirportService) {
  }
}
