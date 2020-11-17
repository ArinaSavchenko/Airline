import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SeatService } from '../Services/seat.service';
import { SeatsSchemeService } from '../Services/seats-scheme.service';

@Component({
  selector: 'app-seat-reservation',
  templateUrl: './seat-reservation.component.html',
  styleUrls: ['./seat-reservation.component.css']
})
export class SeatReservationComponent implements OnInit {

  bookedTicketId: number;
  airplaneScheme: [];

  constructor(private route: ActivatedRoute,
              private seatService: SeatService,
              private seatSchemeService: SeatsSchemeService) {
  }

  ngOnInit(): void {
    this.bookedTicketId = +this.route.snapshot.paramMap.get('id');
    this.seatService.getAirplaneScheme(this.bookedTicketId).subscribe(seats =>
      this.airplaneScheme = this.seatSchemeService.drawScheme(seats));

  }

  seatWasChosen(id: number): void {
    console.log(id);
  }
}
