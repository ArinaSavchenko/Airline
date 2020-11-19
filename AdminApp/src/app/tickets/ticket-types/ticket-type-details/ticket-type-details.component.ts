import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { TicketType } from '../../../Models/TicketType';
import { ResponseModel } from '../../../Models/ResponseModel';
import { ConfirmActionDialogComponent } from '../../../confirm-action-dialog/confirm-action-dialog.component';
import { RefundTypes } from '../../../Enums/RefundTypes';
import { SeatTypes } from '../../../Enums/SeatTypes';
import { TicketTypeService } from '../ticket-type.service';

@Component({
  selector: 'app-ticket-type-details',
  templateUrl: './ticket-type-details.component.html',
  styleUrls: ['./ticket-type-details.component.css']
})
export class TicketTypeDetailsComponent implements OnInit {

  refundTypes = RefundTypes;
  seatTypes = SeatTypes;
  ticketType: TicketType;
  message: string;
  ticketTypeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private ticketTypeService: TicketTypeService,
              private location: Location,
              private formBuilder: FormBuilder,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.ticketTypeService.getTicketType(id).subscribe(ticketType => {
      this.ticketType = ticketType;
      this.ticketTypeForm = this.formBuilder.group({
        id: new FormControl(ticketType.id),
        name: new FormControl(ticketType.name, Validators.required),
        carryOnBagsNumber: new FormControl(ticketType.carryOnBagsNumber, [Validators.required, Validators.min(0)]),
        carryOnBagMaxWeight: new FormControl(ticketType.carryOnBagMaxWeight, [Validators.required, Validators.min(0)]),
        baggageNumber: new FormControl(ticketType.baggageNumber, [Validators.required, Validators.min(0)]),
        baggageMaxWeight: new FormControl(ticketType.baggageMaxWeight, [Validators.required, Validators.min(0)]),
        pricePerExtraCarryOnBag: new FormControl(ticketType.pricePerExtraCarryOnBag, [Validators.required, Validators.min(0)]),
        pricePerExtraCarryOnBagKg: new FormControl(ticketType.pricePerExtraCarryOnBagKg, [Validators.required, Validators.min(0)]),
        pricePerExtraBaggage: new FormControl(ticketType.pricePerExtraBaggage, [Validators.required, Validators.min(0)]),
        pricePerExtraBaggageKg: new FormControl(ticketType.pricePerExtraBaggageKg, [Validators.required, Validators.min(0)]),
        seatReservation: new FormControl(ticketType.seatReservation, [Validators.required]),
        changes: new FormControl(ticketType.changes, Validators.required),
        refund: new FormControl(ticketType.refund, Validators.required),
        seatType: new FormControl(ticketType.seatType, Validators.required)
      });
    });
  }

  onSave(): void {
    if (this.ticketTypeForm.valid) {
      this.openDialog('Are you sure that you want to save changes?');
    }
  }

  onDelete(): void {
    this.openDialog('Are you sure that you want to delete this ticket type?');
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
          case 'Are you sure that you want to delete this ticket type?': {
            this.delete();
            break;
          }
        }
      }
    });
  }

  save(): void {
    this.ticketTypeService.updateTicketType(this.ticketTypeForm.value)
      .subscribe(response => this.checkResult(response));
  }

  delete(): void {
    this.ticketTypeService.deleteTicketType(this.ticketType.id)
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
