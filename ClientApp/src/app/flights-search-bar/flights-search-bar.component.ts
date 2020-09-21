import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import { FlightForSearch } from '../FlightForSearch';
import {SharedService} from '../Shared.service';

@Component({
  selector: 'app-flights-search-bar',
  templateUrl: './flights-search-bar.component.html',
  styleUrls: ['./flights-search-bar.component.css']
})

export class FlightsSearchBarComponent implements OnInit{

  flightForSearchTo: FlightForSearch;
  flightForSearchBack: FlightForSearch;
  ticketType: number;
  amount: number;

  today = new Date();

  constructor(private sharedService: SharedService) {}

  setDeparture(departure: number): void{
    this.flightForSearchTo.departure = departure;
  }
  setArrival(arrival: number): void{
    this.flightForSearchTo.arrival = arrival;
  }

  setAmount(amount: string): void{
    this.flightForSearchTo.amount = +amount;
  }

  setDateTo(date: any): void{
    this.flightForSearchTo.date = new Date(date);
  }

  setDateBack(date: any): void{
    this.flightForSearchBack.date = new Date(date);
  }

  ngOnInit(): void{
    this.sharedService.sharedFlightTo.subscribe(flight => this.flightForSearchTo = flight);
    this.sharedService.sharedFlightBack.subscribe(flight => this.flightForSearchBack = flight);
  }

  sendSearchRequest(): void{
    this.sharedService.nextFlightTo(this.flightForSearchTo);
    if (+this.ticketType === 2){
      this.flightForSearchBack.departure = this.flightForSearchTo.arrival;
      this.flightForSearchBack.arrival = this.flightForSearchTo.departure;
      this.flightForSearchBack.amount = this.flightForSearchTo.amount;
    }
    this.sharedService.nextFlightBack(this.flightForSearchBack);
  }

}
