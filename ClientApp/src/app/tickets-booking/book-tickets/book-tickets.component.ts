import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

import { NewBookedTicket } from '../../Models/NewBookedTIcket';
import { BookedTicketsService } from '../bookedTickets.service';
import { TicketWasBookedResponse } from '../../Models/TicketWasBookedResponse';

@Component({
  selector: 'app-book-tickets',
  templateUrl: './book-tickets.component.html',
  styleUrls: ['./book-tickets.component.css']
})
export class BookTicketsComponent implements OnInit {

  outboundTicketId: number;
  inboundTicketId: number;
  ticketsNumber: number;
  tickets: NewBookedTicket[] = [];
  numberOfRequiredTickets = 0;
  totalPrice: number;
  message: string;

  constructor(private route: ActivatedRoute,
              private bookedTicketsService: BookedTicketsService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.parseQuery();
    if (this.outboundTicketId) {
      this.numberOfRequiredTickets += this.ticketsNumber;
    }
    if (this.inboundTicketId) {
      this.numberOfRequiredTickets += this.ticketsNumber;
    }
  }

  private parseQueryParameter(parameter: string): string {
    return this.route.snapshot.queryParamMap.get(parameter);
  }

  private parseQuery(): void {
    this.outboundTicketId = +this.parseQueryParameter('outboundTicketId');
    this.inboundTicketId = +this.parseQueryParameter('inboundTicketId');
    this.ticketsNumber = +this.parseQueryParameter('ticketsNumber');
  }

  numSequence(value: number): Array<number> {
    return Array(value);
  }

  addBookedTicket(newTicket: NewBookedTicket): void {
    this.tickets.push(newTicket);
    this.countTotalPrice();
  }

  removeBookedTicket(ticketOnDelete: NewBookedTicket): void {
    this.tickets = this.tickets.filter(ticket => ticket !== ticketOnDelete);
    this.countTotalPrice();
  }

  countTotalPrice(): void {
    this.totalPrice = this.tickets
      .map(ticket => ticket.totalPrice)
      .reduce((prev, curr) => prev + curr, 0);
  }

  buy(): void {
    this.bookedTicketsService.postBookedTicket(this.tickets).subscribe(tickets => this.showBookingResults(tickets),
      error => {
        this.message = 'Error occurred while booking';
      });
  }

  showBookingResults(tickets: TicketWasBookedResponse[]): void {
    const queryParams: any = {};

    queryParams.tickets = JSON.stringify(tickets);

    const navigationExtras: NavigationExtras = {
      queryParams
    };

    this.router.navigate(['/booking-results'], navigationExtras);
  }
}
