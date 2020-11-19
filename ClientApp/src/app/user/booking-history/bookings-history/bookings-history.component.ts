import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { BookedTicketHistoryModel } from '../../../Models/BookedTicketHistoryModel';
import { UserService } from '../../user.service';
import { BookedTicketsService } from '../../../tickets-booking/bookedTickets.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-bookings-history',
  templateUrl: './bookings-history.component.html',
  styleUrls: ['./bookings-history.component.css']
})
export class BookingsHistoryComponent implements OnInit {

  userId: number;
  bookedTickets$: Observable<BookedTicketHistoryModel[]>;
  plannedOnly = true;

  constructor(private userService: UserService,
              private bookedTicketsService: BookedTicketsService) {
  }

  ngOnInit(): void {
    this.userId = this.userService.getUserId();
    this.search();
  }

  search(): void {
    if (this.plannedOnly) {
      this.bookedTickets$ = this.bookedTicketsService.getBookedTickets(this.userId).pipe(
        map(bookedTickets => bookedTickets.filter(
          bookedTicket => new Date(bookedTicket.date) >= new Date()
        ).sort((a, b) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()))
      );
    } else {
      this.bookedTickets$ = this.bookedTicketsService.getBookedTickets(this.userId).pipe(
        map(bookedTickets => bookedTickets.sort((a, b) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()))
      );
    }
  }
}
