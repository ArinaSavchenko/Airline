import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';

import { Airport } from '../Models/Airport';
import { AirportService } from '../Services/airport.service';
import { ConfirmActionDialogComponent } from '../confirm-action-dialog/confirm-action-dialog.component';
import { ResponseModel } from '../Models/ResponseModel';

@Component( {
  selector: 'app-airport-details',
  templateUrl: './airport-details.component.html',
  styleUrls: ['./airport-details.component.css']
} )
export class AirportDetailsComponent implements OnInit {

  statuses = ['Active', 'Closed', 'Temporary closed'];
  airport: Airport;
  message: string;

  @ViewChild( MatTable, {static: true} ) table: MatTable<any>;

  constructor(
    private route: ActivatedRoute,
    private airportService: AirportService,
    private location: Location,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.getAirport();
  }

  getAirport(): void {
    const id = +this.route.snapshot.paramMap.get( 'id' );
    this.airportService.getAirport( id )
      .subscribe( airport => {
        this.airport = airport;
      } );
  }

  onSave(): void {
    this.openDialog( 'Are you sure that you want to save changes' );
  }

  onDelete(): void {
    this.openDialog( 'Are you sure that you want to delete this airport' );
  }

  openDialog(value: string): void {
    const dialogRef = this.dialog.open( ConfirmActionDialogComponent, {
      data: value
    } );

    dialogRef.afterClosed().subscribe( result => {
      if (result.event === true) {
        switch (value) {
          case 'Are you sure that you want to save changes': {
            this.save();
            break;
          }
          case 'Are you sure that you want to delete this airport': {
            this.delete();
            break;
          }
        }
      }
    } );
  }

  save(): void {
    this.airportService.updateAirport( this.airport )
      .subscribe( response => this.checkResult( response ) );
  }

  delete(): void {
    this.airportService.deleteAirport( this.airport.id )
      .subscribe( response => this.checkResult( response ) );
  }

  checkResult(response: ResponseModel): void {
    if (!response.success) {
      this.message = response.message;
    } else {
      this.goBack();
    }
  }

  goBack(): void {
    this.location.back();
  }
}

