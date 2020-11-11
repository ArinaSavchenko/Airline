import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Seat } from '../Models/Seat';
import { SeatsService } from '../Services/seats.service';
import { SeatsSchemeService } from '../Services/seats-scheme.service';
import { SeatTypes } from '../Enums/SeatTypes';

@Component({
  selector: 'app-seats-scheme',
  templateUrl: './seats-scheme.component.html',
  styleUrls: ['./seats-scheme.component.css']
})
export class SeatsSchemeComponent implements OnInit {

  airplaneId: number;

  selectedSeatType: string;
  seatTypes = SeatTypes;
  sectorName: string;
  sectorNumber: number;
  column: string;
  seats: number;
  sectors: [];
  seatsScheme = [];
  airplane = [];
  theCabin = [];

  constructor(
    private route: ActivatedRoute,
    private seatsService: SeatsService,
    private router: Router,
    private seatsSchemeService: SeatsSchemeService
  ) {
  }

  ngOnInit(): void {
    this.airplaneId = +this.route.snapshot.paramMap.get('airplaneId');
  }

  onSubmit(): void {
    for (let seatNumber = 1; seatNumber <= this.seats; seatNumber++) {
      const seat: Seat = {
        column: this.column,
        sectorName: this.sectorName,
        sectorNumber: this.sectorNumber,
        number: seatNumber,
        type: this.selectedSeatType,
        airplaneId: this.airplaneId
      };

      this.seatsScheme.push(seat);
    }

    this.theCabin = this.seatsSchemeService.drawScheme(this.seatsScheme);
  }

  add(): void {
    this.seatsService.addSeats(this.seatsScheme)
      .subscribe(() => this.goToTheAirplanes());
  }

  goToTheAirplanes(): void {
    this.router.navigate(['admin/airplanes']);
  }
}
