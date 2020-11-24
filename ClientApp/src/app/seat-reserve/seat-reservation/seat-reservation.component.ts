import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import * as moment from 'moment';

import { ReservedSeat } from '../../Models/ReservedSeat';
import { Seat } from '../../Models/Seat';
import { SeatToBeSelectedModel } from '../../Models/SeatToBeSelectedModel';
import { BookedTicketsService } from '../../tickets-booking/bookedTickets.service';
import { ReservedSeatsService } from '../reserved-seats.service';
import { SeatService } from '../seat.service';
import { SeatsSchemeService } from '../seats-scheme.service';
import { SignalRService } from './SignalR.service';

@Component({
  selector: 'app-seat-reservation',
  templateUrl: './seat-reservation.component.html',
  styleUrls: ['./seat-reservation.component.css']
})
export class SeatReservationComponent implements OnInit, OnDestroy {

  bookedTicketId: number;
  bookedTicketSeatType: string;
  flightId: number;
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
              private router: Router,
              private signalRService: SignalRService) {
  }

  ngOnInit(): void {
    this.bookedTicketId = +this.route.snapshot.paramMap.get('id');

    this.bookedTicketService.getBookedTicket(this.bookedTicketId).subscribe(bookedTicket => {
      this.bookedTicketSeatType = bookedTicket.seatTypeName;
      this.flightId = bookedTicket.flightId;
      this.signalRService.start(this.flightId);
      this.bookedTicketSearchIsFinished = true;
    },
      error => {
      this.message = 'There is now ticket with such id';
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
      this.isSeatWasReserved();
      this.onSchemeDraw();
    },
      error => {});

    this.signalRService.retrieveMappedObject().subscribe(reservedSeats => {
      this.reservedSeats = this.selectedSeat ? reservedSeats.filter(seat => seat.seatId !== this.selectedSeat.id) : reservedSeats;
      this.seatSchemeService.drawScheme(this.seats, this.reservedSeats);
    });
  }

  onSchemeDraw(): void {
    if (this.seatsSearchIsFinished && this.reservedSeatsSearchIsFinished) {
      this.airplaneScheme = this.seatSchemeService.drawScheme(this.seats, this.reservedSeats);
    }
  }

  seatWasChosen(seat: Seat): void {
    if (this.selectedSeat) {
      this.signalRService.unselectSeat(this.bookedTicketId, this.selectedSeat.id);
    }
    if (seat.type === this.bookedTicketSeatType && !seat.isReserved) {
      const selectedSeat: SeatToBeSelectedModel = {
        flightId: this.flightId,
        bookedTicketId: this.bookedTicketId,
        seatId: seat.id,
        selectionTime: moment(new Date()).format('YYYY-MM-DDTHH:mm:ss.sssZ')
      };

      this.signalRService.selectSeat(selectedSeat);

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

  ngOnDestroy(): void {
    if (this.selectedSeat) {
      this.signalRService.unselectSeat(this.bookedTicketId, this.selectedSeat.id);
    }
    this.signalRService.destroy();
  }
}
