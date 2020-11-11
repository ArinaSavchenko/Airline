import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Airplane } from '../Models/Airplane';
import { AirplaneService } from '../Services/airplane.service';

@Component({
  selector: 'app-airplanes',
  templateUrl: './airplanes-info.component.html',
  styleUrls: ['./airplanes-info.component.css']
})
export class AirplanesInfoComponent implements OnInit {

  airplanes$: Observable<Airplane[]>;
  private searchTerms = new Subject<string>();

  constructor(private airplaneService: AirplaneService) {
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.airplanes$ = this.searchTerms.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      switchMap((value: string) => this.airplaneService.searchAirplanes(value))
    );
  }

  displayFn(subject): string {
    return subject ? `${subject.name}` : undefined;
  }
}
