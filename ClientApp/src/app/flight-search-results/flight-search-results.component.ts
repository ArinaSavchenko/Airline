import { Component, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Flight } from '../Models/Flight';
import { FlightService } from '../Services/flight.service';
import { SharedService } from '../Services/Shared.service';
import { FlightForSearch } from '../Models/FlightForSearch';
import { SelectedTickets } from '../Models/SelectedTickets';
import { TicketsService } from '../Services/tickets.service';
import { Ticket } from '../Models/Ticket';

@Component({
  selector: 'app-flight-search-results',
  templateUrl: './flight-search-results.component.html',
  styleUrls: ['./flight-search-results.component.css']
})
export class FlightSearchResultsComponent implements OnInit {

  flightsTo: Flight[];
  flightsBack: Flight[];
  flightTo: FlightForSearch;
  flightBack: FlightForSearch;
  selectedTickets: SelectedTickets;
  clickedOutbound = false;
  clickedInbound = false;
  outboundTicket: Ticket;
  inboundTicket: Ticket;
  selectedFlightTo: Flight;
  selectedFlightBack: Flight;
  private searchTermsTo = new Subject<FlightForSearch>();
  private searchTermsBack = new Subject<FlightForSearch>();
  flightBackIsRequired = false;
  flightsBackFound = false;
  flightsToFound = false;
  searchOfFlightsToIsFinished = false;
  searchOfFlightsBackIsFinished = false;

  constructor(private sharedService: SharedService,
              private flightService: FlightService,
              private ticketsService: TicketsService) {
  }

  search(): void {
    this.searchTermsTo.next(this.flightTo);
    if (this.flightBack.departureAirportId) {
      this.flightBackIsRequired = true;
      this.searchTermsBack.next(this.flightBack);
    } else {
      this.searchOfFlightsBackIsFinished = true;
    }
  }

  onChangeOutboundTicket(): void {
    this.clickedOutbound = false;
    this.outboundTicket.price = 0;
  }

  onChangeInboundTicket(): void {
    this.clickedInbound = false;
    this.inboundTicket.price = 0;
  }

  setOutboundTicket(ticket): void {
    this.selectedTickets.outboundTicketId = ticket.id;
    this.clickedOutbound = true;
    this.outboundTicket = ticket;
    this.flightService.getFlight(this.outboundTicket.flightId)
      .subscribe(flight => this.selectedFlightTo = flight);
  }

  setInboundTicket(ticket): void {
    this.clickedInbound = true;
    this.inboundTicket = ticket;
    this.flightService.getFlight(this.inboundTicket.flightId)
      .subscribe(flight => this.selectedFlightBack = flight);
  }

  ngOnInit(): void {
    this.sharedService.sharedFlightTo.subscribe(flight => {
      this.flightTo = flight;
      this.selectedTickets = {
        outboundTicketId: 0,
        inboundTicketId: 0,
        number: this.flightTo.ticketsNumber
      };
    });
    this.sharedService.sharedFlightBack.subscribe(flight => this.flightBack = flight);

    this.searchTermsTo.pipe(
      distinctUntilChanged(),
      switchMap((term: FlightForSearch) => this.flightService.searchFlights(term)),
    ).subscribe(results => {
      this.flightsTo = results;
      this.searchOfFlightsToIsFinished = true;
      if (this.flightsTo.length > 0) {
        this.flightsToFound = true;
      }
    });

    this.searchTermsBack.pipe(
      distinctUntilChanged(),
      switchMap((term: FlightForSearch) => this.flightService.searchFlights(term)),
    ).subscribe(results => {
      this.flightsBack = results;
      this.searchOfFlightsBackIsFinished = true;
      if (this.flightsBack.length > 0) {
        this.flightsBackFound = true;
      }
    });
    this.search();
  }
}
