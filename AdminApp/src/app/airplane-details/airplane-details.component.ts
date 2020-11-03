import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import { AirplaneService } from '../Services/airplane.service';
import { ConfirmActionDialogComponent } from '../confirm-action-dialog/confirm-action-dialog.component';
import { Airplane } from '../Models/Airplane';

@Component({
  selector: 'app-airplane-details',
  templateUrl: './airplane-details.component.html',
  styleUrls: ['./airplane-details.component.css']
})
export class AirplaneDetailsComponent implements OnInit {

  @ViewChild(MatTable, {static: true}) table: MatTable<any>;

  airplane: Airplane;

  constructor(
    private route: ActivatedRoute,
    private airplaneService: AirplaneService,
    private location: Location,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.airplaneService.getAirplane(id)
      .subscribe(airplane => this.airplane = airplane);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.airplaneService.updateAirplane(this.airplane)
      .subscribe(() => this.goBack());
  }

  delete(): void {
    this.airplaneService.deleteAirplane(this.airplane)
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
          case 'delete this airplane': {
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
    this.openDialog('delete this airplane');
  }

}
