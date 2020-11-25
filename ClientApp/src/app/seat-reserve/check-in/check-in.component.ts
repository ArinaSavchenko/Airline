import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { BookedTicketsService } from '../../tickets-booking/bookedTickets.service';
import { ReservedSeatsService } from '../reserved-seats.service';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css']
})
export class CheckInComponent {

  message: string;
  ticketIdFormat = '^[0-9]+$';
  bookedTicketId = new FormControl(null, [Validators.required, Validators.min(1),
    Validators.pattern(this.ticketIdFormat)]);

  constructor(private bookedTicketService: BookedTicketsService,
              private reservedSeatsService: ReservedSeatsService,
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
      this.reservedSeatsService.getReservedSeats(this.bookedTicketId.value).subscribe(reservedSeats => {
          let seatWasReserved = false;
          reservedSeats.forEach(seat => {
            if (seat.bookedTicketId === this.bookedTicketId.value) {
              seatWasReserved = true;
            }
          });
          if (!seatWasReserved) {
            this.router.navigate([`/airline/seat-reservation/${this.bookedTicketId.value}`]);
          }
          else {
            this.message = 'Seat has been already reserved for this ticket';
          }
        }
      );
    } else {
      this.message = 'Seat reservation in advance is not allowed for this type of ticket';
    }
  }
}
