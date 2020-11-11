import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Airport } from '../Models/Airport';
import { AirportService } from '../Services/airport.service';
import { ConfirmActionDialogComponent } from '../confirm-action-dialog/confirm-action-dialog.component';
import { ResponseModel } from '../Models/ResponseModel';
import { AirportStatuses } from '../Enums/AirportStatuses';

@Component({
  selector: 'app-airport-details',
  templateUrl: './airport-details.component.html',
  styleUrls: ['./airport-details.component.css']
})
export class AirportDetailsComponent implements OnInit {

  airportStatuses = AirportStatuses;
  airport: Airport;
  message: string;
  airportForm: FormGroup;

  @ViewChild(MatTable, {static: true}) table: MatTable<any>;

  constructor(
    private route: ActivatedRoute,
    private airportService: AirportService,
    private location: Location,
    public dialog: MatDialog,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.getAirport();
  }

  getAirport(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.airportService.getAirport(id)
      .subscribe(airport => {
        this.airport = airport;
        this.airportForm = this.formBuilder.group({
          id: this.airport.id,
          name: new FormControl(airport.name, Validators.required),
          city: new FormControl(airport.city, Validators.required),
          country: new FormControl(airport.country, Validators.required),
          status: new FormControl(airport.status, Validators.required)
        });
      });
  }

  onSave(): void {
    this.openDialog('Are you sure that you want to save changes?');
  }

  onDelete(): void {
    this.openDialog('Are you sure that you want to delete this airport?');
  }

  openDialog(value: string): void {
    const dialogRef = this.dialog.open(ConfirmActionDialogComponent, {
      data: value
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === true) {
        switch (value) {
          case 'Are you sure that you want to save changes?': {
            this.save();
            break;
          }
          case 'Are you sure that you want to delete this airport?': {
            this.delete();
            break;
          }
        }
      }
    });
  }

  save(): void {
    if (this.airportForm.valid) {
      this.airportService.updateAirport(this.airportForm.value)
        .subscribe(response => this.checkResult(response));
    }
  }

  delete(): void {
    this.airportService.deleteAirport(this.airport.id)
      .subscribe(response => this.checkResult(response));
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

