import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TicketWasBookedResponse } from '../../Models/TicketWasBookedResponse';

@Component({
  selector: 'app-booking-result',
  templateUrl: './booking-result.component.html',
  styleUrls: ['./booking-result.component.css']
})
export class BookingResultComponent implements OnInit {

  tickets: TicketWasBookedResponse[];

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const tickets = this.route.snapshot.queryParamMap.get('tickets');
    this.tickets = JSON.parse(tickets);
  }
}
