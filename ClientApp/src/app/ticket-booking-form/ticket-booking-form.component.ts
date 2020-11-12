import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ticket-booking-form',
  templateUrl: './ticket-booking-form.component.html',
  styleUrls: ['./ticket-booking-form.component.css']
})
export class TicketBookingFormComponent implements OnInit {

  @Input() ticketId: number;

  constructor() { }

  ngOnInit(): void {
  }

}
