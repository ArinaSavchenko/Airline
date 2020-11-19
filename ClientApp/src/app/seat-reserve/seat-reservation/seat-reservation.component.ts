import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import { ReservedSeat } from '../../Models/ReservedSeat';
import { Seat } from '../../Models/Seat';
import { BookedTicketsService } from '../../tickets-booking/bookedTickets.service';
import { ReservedSeatsService } from '../reserved-seats.service';
import { SeatService } from '../seat.service';
import { SeatsSchemeService } from '../seats-scheme.service';

@Component({
  selector: 'app-seat-reservation',
  templateUrl: './seat-reservation.component.html',
  styleUrls: ['./seat-reservation.component.css']
})
export class SeatReservationComponent implements OnInit {

  bookedTicketId: number;
  bookedTicketSeatType: string;
  seatsSearchIsFinished = false;
  reservedSeatsSearchIsFinished = false;
  bookedTicketSearchIsFinished = false;
  seatWasReserved = false;
  airplaneScheme: [];
  seats: Seat[];
  reservedSeats: ReservedSeat[];
  selectedSeat: Seat;
  message: string;

  constructor(private route: ActivatedRoute,
              private seatService: SeatService,
              private bookedTicketService: BookedTicketsService,
              private seatSchemeService: SeatsSchemeService,
              private reservedSeatsService: ReservedSeatsService,
              public snackbar: MatSnackBar,
              private router: Router) {
  }

  ngOnInit(): void {
    this.bookedTicketId = +this.route.snapshot.paramMap.get('id');
    this.bookedTicketService.getBookedTicket(this.bookedTicketId).subscribe(bookedTicket => {
      this.bookedTicketSeatType = bookedTicket.seatTypeName;
      this.bookedTicketSearchIsFinished = true;
    });

    this.seatService.getAirplaneScheme(this.bookedTicketId).subscribe(seats => {
        this.seats = seats;
        this.seatsSearchIsFinished = true;
        this.onSchemeDraw();
      },
      error => {
      });

    this.reservedSeatsService.getReservedSeats(this.bookedTicketId).subscribe(reservedSeats => {
      this.reservedSeats = reservedSeats;
      this.reservedSeatsSearchIsFinished = true;
      this.onSchemeDraw();
    });
  }

  onSchemeDraw(): void {
    if (this.seatsSearchIsFinished && this.reservedSeatsSearchIsFinished) {
      this.isSeatWasReserved();
      this.airplaneScheme = this.seatSchemeService.drawScheme(this.seats, this.reservedSeats);
    }
  }

  seatWasChosen(seat: Seat): void {
    if (seat.type === this.bookedTicketSeatType && !seat.isReserved) {
      this.selectedSeat = seat;
      this.message = `You've selected ${this.selectedSeat.column}${this.selectedSeat.number} click the button to reserve this seat`;
    } else if (seat.isReserved) {
      this.openSnackbar(`You cannot select this seat because it is already reserved`, 'Close', '');
    } else {
      this.openSnackbar(`You cannot select ${seat.type}, please choose ${this.bookedTicketSeatType}`, 'Close', '');
    }
  }

  isSeatWasReserved(): void {
    this.reservedSeats.forEach(seat => {
      if (seat.bookedTicketId === this.bookedTicketId) {
        this.seatWasReserved = true;
        this.openSnackbar(`You've already reserved seat`, 'Go to the menu', 'goBack');
      }
    });
  }

  reserveSeat(): void {
    const reservedSeat = {
      bookedTicketId: this.bookedTicketId,
      seatId: this.selectedSeat.id
    };
    this.reservedSeatsService.reserveSeat(reservedSeat).subscribe(response => {
        this.seatWasReserved = true;
        this.openSnackbar(response.message, 'Close', 'goBack');
      },
      error => {
        this.openSnackbar('Error occurred, please try again later', 'Close', 'goBack');
      });
  }

  goBack(): void {
    this.router.navigate(['']);
  }

  openSnackbar(message: string, actionMessage: string, action: string): void {
    this.snackbar.open(message, actionMessage, {
      duration: 5000
    })
      .onAction()
      .subscribe(() => {
        if (action === 'goBack') {
          this.goBack();
        }
      });
  }
}
