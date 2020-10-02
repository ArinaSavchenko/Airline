import {Component, OnInit} from '@angular/core';

import {Observable, of, Subject} from 'rxjs';
import {distinctUntilChanged, switchMap} from 'rxjs/operators';

import {Flight} from '../Models/Flight';
import {FlightService} from '../Services/flight.service';
import {SharedService} from '../Services/Shared.service';
import {FlightForSearch} from '../Models/FlightForSearch';
import {SelectedTickets} from '../Models/SelectedTickets';
import {TicketsService} from '../Services/tickets.service';
import {Ticket} from '../Models/Ticket';

@Component({
  selector: 'app-flight-search-results',
  templateUrl: './flight-search-results.component.html',
  styleUrls: ['./flight-search-results.component.css']
})
export class FlightSearchResultsComponent implements OnInit {

  flightsTo$: Observable<Flight[]>;
  flightsBack$: Observable<Flight[]>;
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

  constructor(private sharedService: SharedService, private flightService: FlightService, private ticketsService: TicketsService) {
  }

  search(): void {
    this.searchTermsTo.next(this.flightTo);
    if (this.flightBack.departureAirportId) {
      this.searchTermsBack.next(this.flightBack);
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
    ).subscribe(results => this.flightsTo$ = of(results));

    this.searchTermsBack.pipe(
      distinctUntilChanged(),
      switchMap((term: FlightForSearch) => this.flightService.searchFlights(term)),
    ).subscribe(results => this.flightsBack$ = of(results));
    this.search();
  }
}
