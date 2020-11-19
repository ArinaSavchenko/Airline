import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject } from 'rxjs';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';

import * as moment from 'moment';

import { Flight } from '../../Models/Flight';
import { Ticket } from '../../Models/Ticket';
import { FlightForSearch } from '../../Models/FlightForSearch';
import { TicketsService } from '../../tickets-booking/tickets.service';
import { FlightService } from '../flight.service';

@Component({
  selector: 'app-flight-search-results',
  templateUrl: './flight-search-results.component.html',
  styleUrls: ['./flight-search-results.component.css']
})
export class FlightSearchResultsComponent implements OnInit {

  flightsTo: Flight[];
  flightsBack: Flight[];
  flightForSearchTo: FlightForSearch = {};
  flightForSearchBack: FlightForSearch = {};
  ticketsNumber: number;
  ticketType: string;
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

  constructor(private flightService: FlightService,
              private ticketsService: TicketsService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  search(): void {
    this.searchTermsTo.next(this.flightForSearchTo);

    if (this.flightBackIsRequired) {
      this.searchTermsBack.next(this.flightForSearchBack);
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
    this.ticketType = this.parseQueryParameter('ticketType');

    this.createFlightToAccordingToQuery();

    if (this.ticketType === 'Return') {
      this.flightBackIsRequired = true;
      this.createFlightBackAccordingToQuery();
    }

    this.ticketsNumber = +this.parseQueryParameter('ticketsNumber');

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

  parseQueryParameter(parameter: string): string {
    return this.route.snapshot.queryParamMap.get(parameter);
  }

  createFlightToAccordingToQuery(): void {
    this.flightForSearchTo.departureAirportId = +this.parseQueryParameter('departureAirportId');
    this.flightForSearchTo.arrivalAirportId = + this.parseQueryParameter('arrivalAirportId');
    this.flightForSearchTo.ticketsNumber = +this.parseQueryParameter('ticketsNumber');
    this.flightForSearchTo.date = moment(new Date(this.parseQueryParameter('dateTo'))).format('YYYY-MM-DD');
  }

  createFlightBackAccordingToQuery(): void {
    this.flightForSearchBack.departureAirportId = +this.parseQueryParameter('arrivalAirportId');
    this.flightForSearchBack.arrivalAirportId = + this.parseQueryParameter('departureAirportId');
    this.flightForSearchBack.ticketsNumber = +this.parseQueryParameter('ticketsNumber');
    this.flightForSearchBack.date = moment(new Date(this.parseQueryParameter('dateBack'))).format('YYYY-MM-DD');
  }

  bookTicket(): void {
    this.router.navigate(['booking'], {
      queryParams: {
        outboundTicketId: this.outboundTicket ? this.outboundTicket.id : null,
        inboundTicketId: this.inboundTicket ? this.inboundTicket.id : null,
        ticketsNumber: this.ticketsNumber,
      }
    });
  }
}
