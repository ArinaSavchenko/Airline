import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BookedTicket } from '../../../Models/BookedTicket';
import { BookedTicketsService } from '../../../tickets-booking/bookedTickets.service';

@Component({
  selector: 'app-booked-ticket-details',
  templateUrl: './booked-ticket-details.component.html',
  styleUrls: ['./booked-ticket-details.component.css']
})
export class BookedTicketDetailsComponent implements OnInit {

  bookedTicket: BookedTicket;

  constructor(private bookedTicketService: BookedTicketsService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.bookedTicketService.getBookedTicket(id).subscribe(bookedTicket => this.bookedTicket = bookedTicket);
  }

}
