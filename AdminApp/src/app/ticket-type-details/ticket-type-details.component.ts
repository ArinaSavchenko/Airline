import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { TicketTypeService } from '../Services/ticket-type.service';
import { TicketType } from '../Models/TicketType';
import { ResponseModel } from '../Models/ResponseModel';
import { ConfirmActionDialogComponent } from '../confirm-action-dialog/confirm-action-dialog.component';
import { AirplaneStatuses } from '../Enums/AirplaneStatuses';

@Component({
  selector: 'app-ticket-type-details',
  templateUrl: './ticket-type-details.component.html',
  styleUrls: ['./ticket-type-details.component.css']
})
export class TicketTypeDetailsComponent implements OnInit {

  refundTypes = ['Full refund', 'Refund for fee', 'Partial refund'];
  seatTypes = ['Business', 'Standard'];
  ticketType: TicketType;
  message: string;

  constructor(private route: ActivatedRoute,
              private ticketTypeService: TicketTypeService,
              private location: Location) {
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.ticketTypeService.getTicketType(id).subscribe(ticketType => this.ticketType = ticketType);
  }

  updateTicketType(): void {
    this.ticketTypeService.updateTicketType(this.ticketType).subscribe();
  }

  deleteTicketType(): void {
    this.ticketTypeService.deleteTicket(this.ticketType.id).subscribe();
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

  // onSave(): void {
  //   if (this.ticketType) {
  //     this.openDialog( 'Are you sure that you want to save changes?' );
  //   }
  // }

  // onDelete(): void {
  //   if (this.flightForm.valid) {
  //     this.openDialog( 'Are you sure that you want to delete this ticket type?' );
  //   }
  // }
  //
  // openDialog(value: string): void {
  //   const dialogRef = this.dialog.open( ConfirmActionDialogComponent, {
  //     data: value
  //   } );
  //
  //   dialogRef.afterClosed().subscribe( result => {
  //     if (result.event === true) {
  //       switch (value) {
  //         case 'Are you sure that you want to save changes?': {
  //           this.save();
  //           break;
  //         }
  //         case 'Are you sure that you want to delete this ticket type?': {
  //           this.delete();
  //           break;
  //         }
  //       }
  //     }
  //   } );
  // }

  // save(): void {
  //   this.flightService.updateFlight( this.flight )
  //     .subscribe( response => this.checkResult( response ) );
  // }
  //
  // delete(): void {
  //   this.flightService.deleteFlight( this.flight.id )
  //     .subscribe( response => this.checkResult( response ) );
  // }
}
