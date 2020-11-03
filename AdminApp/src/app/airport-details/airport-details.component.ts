import {Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';

import { Airport } from '../Models/Airport';
import { AirportService } from '../Services/airport.service';
import { ConfirmActionDialogComponent } from '../confirm-action-dialog/confirm-action-dialog.component';

@Component({
  selector: 'app-airport-details',
  templateUrl: './airport-details.component.html',
  styleUrls: ['./airport-details.component.css']
})
export class AirportDetailsComponent implements OnInit {

  @ViewChild(MatTable, {static: true}) table: MatTable<any>;

  airport: Airport;

  constructor(
    private route: ActivatedRoute,
    private airportService: AirportService,
    private location: Location,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.airportService.getAirport(id)
      .subscribe(airport => this.airport = airport);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.airportService.updateAirport(this.airport)
      .subscribe(() => this.goBack());
  }

  delete(): void {
    this.airportService.deleteAirport(this.airport)
      .subscribe(() => this.goBack());
  }

  openDialog(value: string): void {
    const dialogRef = this.dialog.open(ConfirmActionDialogComponent, {
      data: value
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === true) {
        switch (value) {
          case 'save changes': {
            this.save();
            break;
          }
          case 'delete this airport': {
            this.delete();
            break;
          }
        }
      }
    });
  }

  onSave(): void {
    this.openDialog('save changes');
  }

  onDelete(): void {
    this.openDialog('delete this airport');
  }
}

