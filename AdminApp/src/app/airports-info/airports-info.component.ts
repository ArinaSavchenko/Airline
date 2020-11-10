import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Airport } from '../Models/Airport';
import { AirportService } from '../Services/airport.service';

@Component( {
  selector: 'app-airports',
  templateUrl: './airports-info.component.html',
  styleUrls: ['./airports-info.component.css']
} )
export class AirportsInfoComponent implements OnInit {

  airportStatus: string;
  airports$: Observable<Airport[]>;
  private searchTerms = new Subject<string>();

  constructor(private airportService: AirportService) {
  }

  search(term: string): void {
    this.searchTerms.next( term );
  }

  ngOnInit(): void {
    this.airports$ = this.searchTerms.pipe(
      debounceTime( 100 ),
      distinctUntilChanged(),
      switchMap( (value: string) => this.airportService.searchAirports( value ) )
    );
  }

  displayFn(subject): string {
    return subject ? `${subject.city}, ${subject.country}` : undefined;
  }
}
