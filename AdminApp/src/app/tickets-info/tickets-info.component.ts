import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from '../Models/Ticket';
import { TicketService } from '../Services/ticket.service';
import { ActivatedRoute } from '@angular/router';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-tickets-info',
  templateUrl: './tickets-info.component.html',
  styleUrls: ['./tickets-info.component.css']
})
export class TicketsInfoComponent implements OnInit{

  flightId: number;
  tickets$: Observable<Ticket[]>;

  constructor(private ticketService: TicketService,
              private route: ActivatedRoute) {
  }

  ngOnInit(){
    this.flightId = +this.route.snapshot.paramMap.get( 'flightId' );
    this.tickets$ = this.ticketService.getTickets(this.flightId);
  }
}
