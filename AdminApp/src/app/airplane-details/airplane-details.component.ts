import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AirplaneService } from '../Services/airplane.service';
import { ConfirmActionDialogComponent } from '../confirm-action-dialog/confirm-action-dialog.component';
import { Airplane } from '../Models/Airplane';
import { ResponseModel } from '../Models/ResponseModel';
import { SeatsService } from '../Services/seats.service';
import { SeatsSchemeService } from '../Services/seats-scheme.service';
import { AirplaneStatuses } from '../Enums/AirplaneStatuses';

@Component( {
  selector: 'app-airplane-details',
  templateUrl: './airplane-details.component.html',
  styleUrls: ['./airplane-details.component.css']
} )
export class AirplaneDetailsComponent implements OnInit {

  @ViewChild( MatTable, {static: true} ) table: MatTable<any>;

  airplane: Airplane;
  message: string;
  theCabin = [];
  airplaneForm: FormGroup;
  airplaneStatuses = AirplaneStatuses;

  constructor(private route: ActivatedRoute,
              private airplaneService: AirplaneService,
              private location: Location,
              public dialog: MatDialog,
              private seatsService: SeatsService,
              private seatsSchemeService: SeatsSchemeService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.getAirplane();
  }

  getAirplane(): void {
    const id = +this.route.snapshot.paramMap.get( 'id' );
    this.airplaneService.getAirplane( id )
      .subscribe( airplane => {
        this.airplane = airplane;
        this.seatsService.getSeats( this.airplane.id ).subscribe( seats => {
          this.theCabin = this.seatsSchemeService.drawScheme( seats );
          });
        this.airplaneForm = this.formBuilder.group({
          id: this.airplane.id,
          name: new FormControl(airplane.name, Validators.required),
          seatsNumber: new FormControl(airplane.seatsNumber, Validators.required),
          maxWeight: new FormControl(airplane.maxWeight, Validators.required),
          status: new FormControl(airplane.status, Validators.required)
        });
      } );
  }

  save(): void {
    this.airplaneService.updateAirplane( this.airplaneForm.value )
      .subscribe( response => this.checkResult( response ) );
  }

  delete(): void {
    this.airplaneService.deleteAirplane( this.airplane.id )
      .subscribe( response => this.checkResult( response ) );
  }

  openDialog(value: string): void {
    const dialogRef = this.dialog.open( ConfirmActionDialogComponent, {
      data: value
    } );

    dialogRef.afterClosed().subscribe( result => {
      if (result.event === true) {
        switch (value) {
          case 'Are you sure that you want to save changes?': {
            this.save();
            break;
          }
          case 'Are you sure that you want to delete this airplane?': {
            this.delete();
            break;
          }
        }
      }
    } );
  }

  onSave(): void {
    if (this.airplaneForm.valid) {
      this.openDialog( 'Are you sure that you want to save changes?' );
    }
  }

  onDelete(): void {
    this.openDialog( 'Are you sure that you want to delete this airplane?' );
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
