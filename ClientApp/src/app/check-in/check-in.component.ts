import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { BookedTicketsService } from '../Services/bookedTickets.service';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css']
})
export class CheckInComponent {

  bookedTicketId = new FormControl(null, [Validators.required, Validators.min(1)]);
  message: string;

  constructor(private bookedTicketService: BookedTicketsService,
              private router: Router) {
  }

  onCheckIn(): void {
    this.bookedTicketService.getBookedTicket(this.bookedTicketId.value).subscribe(bookedTicket => this.checkIn(bookedTicket),
      (error) => {
        if (error.status === 404) {
          this.message = 'There is no booked ticket with such id';
        }
        });
  }

  checkIn(bookedTicket): void {
    if (bookedTicket.seatReservation) {
      this.router.navigate([`/airline/seat-reservation/${this.bookedTicketId.value}`]);
    }
    else {
      this.message = 'Seat reservation in advance is not allowed for this type of ticket';
    }
  }
}
