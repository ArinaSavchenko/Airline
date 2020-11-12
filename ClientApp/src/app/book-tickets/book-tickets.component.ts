import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ticket } from '../Models/Ticket';

@Component({
  selector: 'app-book-tickets',
  templateUrl: './book-tickets.component.html',
  styleUrls: ['./book-tickets.component.css']
})
export class BookTicketsComponent implements OnInit {

  outboundTicketId: number;
  inboundTicketId: number;
  ticketsNumber: number;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.parseQuery();
    if (this.outboundTicketId) {

    }
    if (this.inboundTicketId) {

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
}
